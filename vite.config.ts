import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const tsconfigPaths = await import("vite-tsconfig-paths").then((mod) => mod.default);

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
      open: true,
    },
    build: {
      outDir: "dist",
      sourcemap: false,
    },
  };
});
