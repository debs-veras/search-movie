import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["1599-2804-e4c-3e40-272-295e-a690-d8b4-d6b3.ngrok-free.app"],
  },
});
