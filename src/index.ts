import { App } from "vue";
import { componentsPlugin } from "./components";

const ColorPickerLibrary = {
  install(app: App) {
    for (const componentKey in componentsPlugin) {
      app.use((componentsPlugin as any)[componentKey]);
    }
  },
};

export * from "./components";
export default ColorPickerLibrary;
