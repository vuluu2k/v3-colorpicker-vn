import { App, Plugin } from "vue";

import ColorPicker from "./ColorPicker.vue";

export default {
  install(Vue: App) {
    Vue.component(ColorPicker.name as string, ColorPicker);
  },
} as Plugin;

export { ColorPicker as VuColorPicker };
