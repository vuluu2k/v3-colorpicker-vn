import { App, Plugin } from "vue";

import ColorBg from "./ColorBg.vue";

export default {
  install(Vue: App) {
    Vue.component(ColorBg.name as string, ColorBg);
  }
} as Plugin;

export { ColorBg as VuColorBg };
