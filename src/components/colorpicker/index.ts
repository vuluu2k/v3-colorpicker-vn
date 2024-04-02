import { App, Plugin } from "vue";

import ColorPicker from "./ColorPicker.vue";

export default {
  install(Vue: App) {
    Vue.component("ColorPicker", ColorPicker);
  },
} as Plugin;

export { ColorPicker };
