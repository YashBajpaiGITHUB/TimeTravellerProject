import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { searchQuerySchema } from "@shared/types";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Extend the search query schema for the form
const searchFormSchema = searchQuerySchema.extend({
  query: z.string().min(1, "Search query is required"),
  description: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface HistoricalResult {
  title: string;
  summary: string;
  timeline: { year: number; description: string }[];
  images: string[];
  nearbyLocations?: string[];
  userImage?: boolean;
}

export const SearchForm = () => {
  const [searchTab, setSearchTab] = useState<"text" | "coordinates" | "current-location" | "image">("text");
  const [searchResult, setSearchResult] = useState<HistoricalResult | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const { toast } = useToast();
  
  // Form for text search
  const textForm = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
      type: "text",
    },
  });
  
  // Form for coordinate search
  const coordinateForm = useForm<{ latitude: number; longitude: number }>({
    resolver: zodResolver(z.object({
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    })),
    defaultValues: {
      latitude: 0,
      longitude: 0,
    },
  });
  
  // Form for image search
  const imageForm = useForm<{ imageData: string; description: string }>({
    resolver: zodResolver(z.object({
      imageData: z.string().min(1, "Image data is required"),
      description: z.string().min(1, "Description is required"),
    })),
    defaultValues: {
      imageData: "",
      description: "",
    },
  });
  
  // Text search mutation
  const textSearchMutation = useMutation({
    mutationFn: async (values: SearchFormValues) => {
      const response = await apiRequest("/api/search", {
        method: "POST",
        body: JSON.stringify(values),
      });
      return response.json() as Promise<HistoricalResult>;
    },
    onSuccess: (data: HistoricalResult) => {
      setSearchResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/search"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Search failed",
        description: error.message || "Failed to search for historical data",
      });
    },
  });
  
  // Coordinate search mutation
  const coordinateSearchMutation = useMutation({
    mutationFn: async (values: { latitude: number; longitude: number }) => {
      const response = await apiRequest("/api/search/coordinates", {
        method: "POST",
        body: JSON.stringify(values),
      });
      return response.json() as Promise<HistoricalResult>;
    },
    onSuccess: (data: HistoricalResult) => {
      setSearchResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/search/coordinates"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Location search failed",
        description: error.message || "Failed to search for historical data at this location",
      });
    },
  });
  
  // Image search mutation
  const imageSearchMutation = useMutation({
    mutationFn: async (values: { imageData: string; description: string }) => {
      const response = await apiRequest("/api/search/image", {
        method: "POST",
        body: JSON.stringify(values),
      });
      return response.json() as Promise<HistoricalResult>;
    },
    onSuccess: (data: HistoricalResult) => {
      setSearchResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/search/image"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Image search failed",
        description: error.message || "Failed to search for historical data using this image",
      });
    },
  });
  
  // Get current location
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          coordinateForm.setValue("latitude", latitude);
          coordinateForm.setValue("longitude", longitude);
          setIsLoadingLocation(false);
          
          // Automatically search once we have coordinates
          coordinateSearchMutation.mutate({ latitude, longitude });
        },
        (error) => {
          setIsLoadingLocation(false);
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Unable to get your current location. Please check your browser permissions.",
          });
          console.error("Geolocation error:", error);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Location not supported",
        description: "Geolocation is not supported by your browser",
      });
    }
  };
  
  // Handle file upload for image search
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          imageForm.setValue("imageData", result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle form submissions
  const onTextSearchSubmit = (values: SearchFormValues) => {
    textSearchMutation.mutate(values);
  };
  
  const onCoordinateSearchSubmit = (values: { latitude: number; longitude: number }) => {
    coordinateSearchMutation.mutate(values);
  };
  
  const onImageSearchSubmit = (values: { imageData: string; description: string }) => {
    imageSearchMutation.mutate(values);
  };
  
  const isLoading = textSearchMutation.isPending || coordinateSearchMutation.isPending || imageSearchMutation.isPending || isLoadingLocation;
  
  return (
    <div className="container mx-auto">
      <Tabs defaultValue="text" value={searchTab} onValueChange={(value) => setSearchTab(value as any)}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="text">Text Search</TabsTrigger>
          <TabsTrigger value="coordinates">Coordinates</TabsTrigger>
          <TabsTrigger value="current-location">Current Location</TabsTrigger>
          <TabsTrigger value="image">Image Upload</TabsTrigger>
        </TabsList>
        
        {/* Text Search Tab */}
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Search by Text</CardTitle>
              <CardDescription>Enter a place, person, event, or object to discover its history</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...textForm}>
                <form onSubmit={textForm.handleSubmit(onTextSearchSubmit)} className="space-y-4">
                  <FormField
                    control={textForm.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Search Query</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a place, person, or event..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search History"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Coordinates Tab */}
        <TabsContent value="coordinates">
          <Card>
            <CardHeader>
              <CardTitle>Search by Coordinates</CardTitle>
              <CardDescription>Enter latitude and longitude to discover the history of that location</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...coordinateForm}>
                <form onSubmit={coordinateForm.handleSubmit(onCoordinateSearchSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={coordinateForm.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="any" 
                              placeholder="e.g. 40.7128" 
                              {...field} 
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={coordinateForm.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              step="any" 
                              placeholder="e.g. -74.0060" 
                              {...field} 
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search History"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Current Location Tab */}
        <TabsContent value="current-location">
          <Card>
            <CardHeader>
              <CardTitle>Use Current Location</CardTitle>
              <CardDescription>Use your device's location to discover nearby historical sites</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Button 
                onClick={getCurrentLocation} 
                disabled={isLoading}
                className="w-full mb-4"
              >
                {isLoading ? "Getting Location..." : "Detect My Location"}
              </Button>
              
              {coordinateForm.getValues("latitude") !== 0 && (
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-500">
                    Your location: {coordinateForm.getValues("latitude").toFixed(6)}, {coordinateForm.getValues("longitude").toFixed(6)}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Image Upload Tab */}
        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Search by Image</CardTitle>
              <CardDescription>Upload an image and provide a description to find historical information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...imageForm}>
                <form onSubmit={imageForm.handleSubmit(onImageSearchSubmit)} className="space-y-4">
                  <div className="mb-4">
                    <FormLabel>Upload Image</FormLabel>
                    <Input type="file" accept="image/*" onChange={handleFileUpload} className="mt-1" />
                  </div>
                  
                  <FormField
                    control={imageForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Describe what's in the image..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading || !imageForm.getValues("imageData")}
                  >
                    {isLoading ? "Searching..." : "Search History"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Search Results */}
      {searchResult && (
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>{searchResult.title}</CardTitle>
              <CardDescription>Historical Information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Summary */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Summary</h3>
                  <p>{searchResult.summary}</p>
                </div>
                
                {/* Timeline */}
                {searchResult.timeline && searchResult.timeline.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Historical Timeline</h3>
                    <ul className="space-y-2">
                      {searchResult.timeline.map((event, index) => (
                        <li key={index} className="border-l-2 border-primary pl-4 py-1">
                          <span className="font-bold">{event.year}: </span>
                          {event.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Images */}
                {searchResult.images && searchResult.images.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Historical Images</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {searchResult.images.map((image, index) => (
                        <img 
                          key={index} 
                          src={image} 
                          alt={`Historical image of ${searchResult.title}`} 
                          className="rounded-md shadow-md max-h-48 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Nearby Locations */}
                {searchResult.nearbyLocations && searchResult.nearbyLocations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Nearby Historical Locations</h3>
                    <ul className="list-disc pl-5">
                      {searchResult.nearbyLocations.map((location, index) => (
                        <li key={index}>{location}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};