import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { nationSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/months", async (_req, res) => {
    try {
      const months = await storage.getAvailableMonths();
      res.json(months);
    } catch (error) {
      console.error("Error fetching months:", error);
      res.status(500).json({ error: "Failed to fetch available months" });
    }
  });

  app.get("/api/radar", async (req, res) => {
    try {
      const { month, nation } = req.query;

      if (!month || typeof month !== "string") {
        return res.status(400).json({ error: "Month parameter is required" });
      }

      const parsedNation = nationSchema.safeParse(nation);
      if (!parsedNation.success) {
        return res.status(400).json({ error: "Invalid nation parameter. Use 'domestic' or 'export'" });
      }

      const radarData = await storage.getRadarData(month, parsedNation.data);

      if (!radarData) {
        return res.status(404).json({ error: "No data found for the specified month and nation" });
      }

      res.json(radarData);
    } catch (error) {
      console.error("Error fetching radar data:", error);
      res.status(500).json({ error: "Failed to fetch radar data" });
    }
  });

  return httpServer;
}
