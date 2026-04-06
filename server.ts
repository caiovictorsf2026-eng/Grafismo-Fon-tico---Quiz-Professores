import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/leads", (req, res) => {
    const lead = req.body;
    const leadsPath = path.join(process.cwd(), "leads.json");
    
    let leads = [];
    if (fs.existsSync(leadsPath)) {
      try {
        const data = fs.readFileSync(leadsPath, "utf-8");
        leads = JSON.parse(data);
      } catch (e) {
        console.error("Error reading leads file", e);
      }
    }
    
    leads.push({ ...lead, timestamp: new Date().toISOString() });
    
    try {
      fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));
      res.json({ success: true });
    } catch (e) {
      console.error("Error writing leads file", e);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
