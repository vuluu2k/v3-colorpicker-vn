import { App } from "vue";
import * as components from "./components";

const VuLibrary = {
  install(app: App) {
    for (const componentKey in components) {
      app.use((components as any)[componentKey]);
    }
  },
};

export default VuLibrary;
export * from "./components"