import { Express, Request, Response, NextFunction } from "express";
import { Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { insertWaitlistSubscriberSchema } from "@shared/schema";
import { wikipediaService } from "./services/wikipediaService";
import { searchQuerySchema, coordinateSearchSchema, imageSearchSchema } from "@shared/types";

interface HistoricalSearch {
    id: number;
    query: string;
    type: string;
    userId: string | null;
    latitude: string | null;
    longitude: string | null;
    imageData: string | null;
}

interface HistoricalData {
    id: number;
    title: string;
    summary: string;
    timeline: any[];
    images: string[];
    searchId: number;
}

export async function registerRoutes(app: Express): Promise<Server> {
    // Health check endpoint
    app.get("/api/health", (_req, res) => {
        res.json({ status: "ok" });
        return; // Added return statement
    });

    // Waitlist subscription
    app.post("/api/waitlist", async (req, res, next) => {
        try {
            const { email } = insertWaitlistSubscriberSchema.parse(req.body);

            const existingSubscriber = await storage.getWaitlistSubscriberByEmail(email);
            if (existingSubscriber) {
                return res.status(409).json({ error: "Email already subscribed" });
            }

            const subscriber = await storage.addWaitlistSubscriber({ email });
            return res.status(201).json(subscriber); // Added return statement
        } catch (err) {
            next(err);
        }
    });

    // Wikipedia search endpoint
    app.post("/api/search", async (req, res, next) => {
        try {
            const { query, type } = searchQuerySchema.parse(req.body);

            const search = await storage.createHistoricalSearch({
                query,
                type: type || "text",
                userId: req.body.userId || null,
                latitude: req.body.latitude?.toString() || null,
                longitude: req.body.longitude?.toString() || null,
                imageData: req.body.imageData || null,
            });

            const historicalInfo = await wikipediaService.getHistoricalTimeline(query);
            const pageDetails = await wikipediaService.getPageDetails(historicalInfo.title);

            const historicalData = await storage.createHistoricalData({
                title: historicalInfo.title,
                summary: pageDetails.extract,
                timeline: historicalInfo.timeline || [],
                images: pageDetails.images || [], // Ensure images is always an array
                searchId: search.id,
            });

            const results = {
                title: historicalData.title,
                summary: historicalData.summary,
                timeline: historicalData.timeline,
                images: historicalData.images,
            };

            return res.json(results); // Added return statement
        } catch (error) {
            console.error("Error fetching historical data:", error);
            next(error);
        }
    });

    // Location-based search endpoint
    app.post("/api/search/coordinates", async (req, res, next) => {
        try {
            const { latitude, longitude } = coordinateSearchSchema.parse(req.body);

            const nearbyLocations = await wikipediaService.getNearbyLocations(latitude, longitude);
            if (nearbyLocations.length === 0) {
                return res.status(404).json({ error: "No historical locations found nearby" });
            }

            const topLocation = nearbyLocations[0];
            const search = await storage.createHistoricalSearch({
                query: topLocation.title,
                type: "coordinates",
                userId: req.body.userId || null,
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                imageData: null,
            });

            const historicalInfo = await wikipediaService.getHistoricalTimeline(topLocation.title);
            const pageDetails = await wikipediaService.getPageDetails(historicalInfo.title);

            const historicalData = await storage.createHistoricalData({
                title: historicalInfo.title,
                summary: pageDetails.extract,
                timeline: historicalInfo.timeline || [],
                images: pageDetails.images || [], // Ensure images is always an array
                searchId: search.id,
            });

            const results = {
                title: historicalData.title,
                summary: historicalData.summary,
                timeline: historicalData.timeline,
                images: historicalData.images,
                nearbyLocations: nearbyLocations.slice(0, 5).map(location => location.title),
            };

            return res.json(results); // Added return statement
        } catch (error) {
            console.error("Error fetching location data:", error);
            next(error);
        }
    });

    // Image-based search endpoint
    app.post("/api/search/image", async (req, res, next) => {
        try {
            const { imageData, description } = imageSearchSchema.parse(req.body);
            if (!description) {
                return res.status(400).json({ error: "Image description is required for image-based searches" });
            }

            const search = await storage.createHistoricalSearch({
                query: description,
                type: "image",
                userId: req.body.userId || null,
                latitude: null,
                longitude: null,
                imageData: imageData || null,
            });

            const historicalInfo = await wikipediaService.getHistoricalTimeline(description);
            const pageDetails = await wikipediaService.getPageDetails(historicalInfo.title);

            const historicalData = await storage.createHistoricalData({
                title: historicalInfo.title,
                summary: pageDetails.extract,
                timeline: historicalInfo.timeline || [],
                images: pageDetails.images || [], // Ensure images is always an array
                searchId: search.id,
            });

            const results = {
                title: historicalData.title,
                summary: historicalData.summary,
                timeline: historicalData.timeline,
                images: historicalData.images
            };

            return res.json(results); // Added return statement
        } catch (error) {
            console.error("Error fetching historical data from image:", error);
            next(error);
        }
    });

    // Create a server
    const http = await import('node:http');
    const server = http.createServer(app);
    return server;
}