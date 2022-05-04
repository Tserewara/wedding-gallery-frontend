import { createApp } from "vue";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

import router from "@/presentation/router";
import App from "@/presentation/App.vue";
import store from "@/presentation/store";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Toast, {});
app.mount("#app");
