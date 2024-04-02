import { App, Plugin } from "vue";

import ColorPickerPick from "./ColorPickerPick.vue";

export default {
  install(Vue: App) {
    Vue.component("ColorPickerPick", ColorPickerPick);
  },
} as Plugin;

export { ColorPickerPick };
