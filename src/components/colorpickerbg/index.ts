import { App, Plugin } from "vue";

import ColorPickerBackground from "./ColorPickerBackground.vue";

export default {
  install(Vue: App) {
    Vue.component(ColorPickerBackground.name as string, ColorPickerBackground);
  },
} as Plugin;

export { ColorPickerBackground as VuColorPickerBackground };
