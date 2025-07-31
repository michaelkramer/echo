import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  appDirectory: "src",
  presets: [vercelPreset()],
  ssr: false,
} satisfies Config;
