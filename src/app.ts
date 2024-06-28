import type { App } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();

export default (app: App) => {
  pinia.use(piniaPluginPersistedstate);
  app.use(pinia);
};
