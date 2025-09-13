import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.lottie"], // ✅ Add support for .lottie assets
  server: {
    
    proxy: {
      "/zap": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/zap/, "/JSON"),
      },
    },
  },
});
