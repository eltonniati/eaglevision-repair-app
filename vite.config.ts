import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",  // Listen on all IPv6 and IPv4 addresses
    port: 8080,  // Default port 8080
  },
  plugins: [
    react(),  // Using SWC for faster compilation
    mode === 'development' && componentTagger(),  // Conditional plugin for dev only
  ].filter(Boolean),  // Remove any false values from plugins array
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Path alias for src directory
    },
  },
}));
