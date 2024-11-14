import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [

      {
        find: "hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "screens",
        replacement: path.resolve(__dirname, "./src/screens"),
      },
      {
        find: "utils",
        replacement: path.resolve(__dirname, "./src/utils"),
      },
    ],
  },
});
