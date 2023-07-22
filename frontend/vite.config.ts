import { resolve } from "path";
import { defineConfig } from "vite";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
    plugins: [WindiCSS()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                admin: resolve(__dirname, "admin.html"),
            },
            output: {
                entryFileNames: "index.ashes.js",
                assetFileNames: "index.ashes.css",
            },
        },
    },
});
