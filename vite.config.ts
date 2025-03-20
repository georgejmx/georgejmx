import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  // @ts-expect-error Vite config typing doesn't work with Vitest config out of the box
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [],
  },
});
