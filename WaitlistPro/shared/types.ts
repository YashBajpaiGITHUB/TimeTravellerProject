import { z } from 'zod';

// Schema for search queries
export const searchQuerySchema = z.object({
  query: z.string().min(1, "Search query is required"),
  type: z.enum(['text', 'coordinates', 'current-location', 'image']).default('text')
});

// Schema for coordinate-based searches
export const coordinateSearchSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});

// Schema for image-based searches
export const imageSearchSchema = z.object({
  imageData: z.string(),
  description: z.string().optional()
});

// Timeline event
export const timelineEventSchema = z.object({
  year: z.number(),
  description: z.string()
});

// Historical data response
export const historicalDataSchema = z.object({
  title: z.string(),
  summary: z.string(),
  timeline: z.array(timelineEventSchema),
  images: z.array(z.string()).optional()
});

// Types derived from schemas
export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type CoordinateSearch = z.infer<typeof coordinateSearchSchema>;
export type ImageSearch = z.infer<typeof imageSearchSchema>;
export type TimelineEvent = z.infer<typeof timelineEventSchema>;
export type HistoricalData = z.infer<typeof historicalDataSchema>;