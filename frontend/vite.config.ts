import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [WindiCSS()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.ashes.js",
        assetFileNames: "index.ashes.css",
      },
    },
  },
});