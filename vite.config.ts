import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      styles: resolve(__dirname, "src", "styles"),
    },
  },
  plugins: [react(), viteTsconfigPaths()],
});
