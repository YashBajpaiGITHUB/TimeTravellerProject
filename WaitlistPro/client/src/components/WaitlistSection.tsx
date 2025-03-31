import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

const WaitlistSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: (values: WaitlistFormValues) => {
      return apiRequest("POST", "/api/waitlist/signup", values);
    },
    onSuccess: async (response) => {
      const data = await response.json();
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: data.message || "You've been added to our waitlist.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: WaitlistFormValues) => {
    waitlistMutation.mutate(values);
  };

  const waitlistBenefits = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>,
      title: "Early Access",
      description: "Be the first to explore history with Chronos before it's available to the general public."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>,
      title: "Special Discount",
      description: "Receive exclusive pricing and benefits available only to our early adopters."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>,
      title: "Shape the Product",
      description: "Provide feedback and help us refine Chronos to better serve your historical exploration needs."
    }
  ];

  return (
    <section id="waitlist" className="py-20 bg-primary bg-opacity-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-primary tracking-tight sm:text-4xl">
            Be Among the First Time Travelers
          </h2>
          <p className="mt-4 text-lg text-neutral-medium">
            Join our waitlist to get early access to Chronos and start exploring history like never before. We'll notify you as soon as the time machine is ready.
          </p>

          <div className="mt-10">
            {isSubmitted ? (
              <div className="py-4 px-6 bg-green-100 text-green-800 rounded-lg max-w-xl mx-auto">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Thank you for joining the waitlist!</span>
                </div>
                <p className="mt-2">We'll notify you when Chronos is ready for exploration.</p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row shadow-md rounded-lg overflow-hidden">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Your email address"
                              className="flex-grow px-5 py-4 focus:ring-primary focus:border-primary block w-full border-transparent rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg h-[54px]"
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={waitlistMutation.isPending}
                      className="w-full sm:w-auto px-8 py-4 border border-transparent text-base font-medium rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark h-[54px]"
                    >
                      {waitlistMutation.isPending ? "Joining..." : "Join Waitlist"}
                    </Button>
                  </div>
                  <p className="text-sm text-neutral-medium mt-3">
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </Form>
            )}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {waitlistBenefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-opacity-10 flex items-center justify-center mb-4" style={{ backgroundColor: index === 0 ? 'rgba(230,176,18,0.1)' : index === 1 ? 'rgba(26,58,143,0.1)' : 'rgba(211,84,0,0.1)' }}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-dark mb-2">{benefit.title}</h3>
                <p className="text-neutral-medium text-center">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
