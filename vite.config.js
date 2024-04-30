import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [vue()],
  resolve: {
    alias: {
      "@views": path.resolve(__dirname, "./src/views"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@language": path.resolve(__dirname, "./src/language"),
    },
  },
});
