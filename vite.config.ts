import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/",

  plugins: [react()],

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],

    alias: {
      "@": path.resolve(__dirname, "./src"),

      "figma:asset/2e11acd823eea2c3bd6e6b340a53369a143c69fa.png":
        path.resolve(
          __dirname,
          "./src/assets/2e11acd823eea2c3bd6e6b340a53369a143c69fa.png"
        ),
    },
  },

  build: {
    target: "esnext",
    outDir: "build",
  },

  server: {
    port: 3000,
    open: true,
  },
});
