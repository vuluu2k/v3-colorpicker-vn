import { App, Plugin } from "vue";

import ColorCustom from "./ColorCustom.vue";

export default {
  install(Vue: App) {
    Vue.component(ColorCustom.name as string, ColorCustom);
  }
} as Plugin;

export { ColorCustom as VuColorCustom };
