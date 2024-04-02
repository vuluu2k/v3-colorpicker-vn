import { App, Plugin } from "vue";

import ColorPicker from "./ColorPicker.vue";

export default {
  install(Vue: App) {
    Vue.component("VuColorPicker", ColorPicker);
  },
} as Plugin;

export { ColorPicker as VuColorPicker };
