import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/echo/",
  plugins: [reactRouter()],
});
