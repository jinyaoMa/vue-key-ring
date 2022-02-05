import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createI18n } from "vue-i18n";
import { ZH, EN, messages, isChinese } from "./utils";
import "@fortawesome/fontawesome-free/css/all.min.css";

createApp(App)
  .use(router)
  .use(
    createI18n({
      locale: isChinese() ? ZH : EN,
      fallbackLocale: EN,
      messages,
    })
  )
  .mount("#app");
