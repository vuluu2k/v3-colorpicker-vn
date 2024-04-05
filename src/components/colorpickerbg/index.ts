import { App, Plugin } from "vue";

import ColorPickerBg from "./ColorPickerBg.vue";

export default {
  install(Vue: App) {
    Vue.component(ColorPickerBg.name as string, ColorPickerBg);
  }
} as Plugin;

export { ColorPickerBg as VuColorPickerBg };
