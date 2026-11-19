import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/what-are-you-lawyer/",
  plugins: [react()],
});
