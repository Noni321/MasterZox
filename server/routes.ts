import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(validatedData);
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        data: { id: message.id }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed",
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Get messages error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve messages" 
      });
    }
  });

  return httpServer;
}
