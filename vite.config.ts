import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  publicDir: path.resolve(__dirname, "client/public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  server: {
    port: 5173,
    // Allows the dev server to be reached through a temporary public tunnel
    // (e.g. localtunnel's *.loca.lt) for quick demo sharing — Vite blocks
    // unrecognized Host headers by default as a DNS-rebinding protection.
    allowedHosts: [".loca.lt"],
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
    allowedHosts: [".loca.lt"],
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icon-192.png",
        "icon-512.png",
        "riley.jpg",
        "riley-stage-wide.jpg",
        "riley-teaching.mp4",
        "riley-teaching-2.mp4",
        "marcus.jpg",
        "marcus-stage-wide.jpg",
        "marcus-teaching.mp4",
        "marcus-teaching-2.mp4",
        "echo.jpg",
        "echo-stage-wide.jpg",
        "echo-teaching.mp4",
        "echo-teaching-2.mp4",
        "nicky.jpg",
        "nicky-stage-wide.jpg",
        "nicky-teaching.mp4",
        "nicky-teaching-2.mp4",
        "mia.jpg",
        "mia-stage-wide.jpg",
        "mia-teaching.mp4",
        "mia-teaching-2.mp4",
      ],
      manifest: {
        name: "SpeakMate AI — 開口練英文",
        short_name: "SpeakMate",
        // Static manifest text can't follow the in-app locale switcher, so
        // this stays in one language — matches the app's zh-Hant default.
        description: "情境對話練習口說，Riley 教你立即能用的英文。",
        start_url: "/",
        display: "standalone",
        background_color: "#F5F8FD",
        theme_color: "#397FEE",
        lang: "zh-Hant",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        // mp3 = the 25 recorded model-sentence clips; mp4 = Riley's looping
        // teaching-gesture video (~1MB) — both precached so the whole core
        // loop, including Riley's voice and motion, still works offline.
        globPatterns: ["**/*.{js,css,html,png,jpg,svg,woff2,mp3,mp4}"],
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
});
