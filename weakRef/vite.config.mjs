import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 2000,
    },
    resolve: {
      extensions: [".js", ".mjs"],
    },
    plugins: [],
  };
});
