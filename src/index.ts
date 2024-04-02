import { App } from "vue";
import * as components from "./components";

const ColorPickerLibrary = {
  install(app: App) {
    for (const componentKey in components) {
      app.use((components as any)[componentKey]);
    }
  },
};

export * from "./components";
export default ColorPickerLibrary;
