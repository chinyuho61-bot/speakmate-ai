import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import { ENV } from "./env.js";
import { authRouter } from "./routes/auth.js";
import { progressRouter } from "./routes/progress.js";
import { freeTalkRouter } from "./routes/freeTalk.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use("/api/auth", authRouter);
app.use("/api/progress", progressRouter);
app.use("/api/free-talk", freeTalkRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// In production, serve the built client (vite build output) and fall back to
// index.html for client-side routing.
// __dirname at runtime is <repo>/dist-server/server, so climb two levels back
// to the repo root before descending into the vite build output.
const clientDist = path.resolve(__dirname, "../../dist/public");
if (ENV.nodeEnv === "production" && existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get(/^(?!\/api\/).*/, (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(ENV.port, () => {
  console.log(`SpeakMate API listening on http://localhost:${ENV.port} (${ENV.nodeEnv})`);
});
