import { App, Plugin } from "vue";

import ProgressInput from "./ProgressInput.vue";

export default {
  install(Vue: App) {
    Vue.component(ProgressInput.name as string, ProgressInput);
  }
} as Plugin;

export { ProgressInput as VuProgressInput };
