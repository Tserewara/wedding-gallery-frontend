import { createApp } from "vue";
import router from "@/presentation/router";
import App from "@/presentation/App.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
const options = {};
app.use(router);
app.use(Toast, options);
app.mount("#app");
