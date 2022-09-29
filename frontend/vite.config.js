import WindiCSS from "vite-plugin-windicss";

export default {
  plugins: [WindiCSS()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.ashes.js",
        assetFileNames: "index.ashes.css",
      },
    },
  },
};
