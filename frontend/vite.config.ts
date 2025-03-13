import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import path from "path";
import "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
  server: { host: true, hmr: { path: "hmr" } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.ts",
  },
});
