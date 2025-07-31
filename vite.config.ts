import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [reactRouter()],
  server: {
    port: 5173,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
