import { App, Plugin } from "vue";

import ColorPickerBackground from "./ColorPickerBackground.vue";

export default {
  install(Vue: App) {
    Vue.component("ColorPickerBackground", ColorPickerBackground);
  },
} as Plugin;

export { ColorPickerBackground };
