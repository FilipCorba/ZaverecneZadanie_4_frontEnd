import { createApp } from "vue";
import Vuex from "vuex";
import "./style.css";
import router from "./router";
import App from "./App.vue";

import store from "./store";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  },
  theme: {
    defaultTheme: "light",
  },
});

app.use(store);
app.use(vuetify);
app.use(router);

app.mount("#app");
