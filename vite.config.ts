import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "ColorPickerVue3",
      fileName: "colorpicker-vue3",
    },
    rollupOptions: {
      external: isExternal,
      output: {
        sourcemapExcludeSources: true,
      },
    },
    sourcemap: true,
    minify: true
  },
});
