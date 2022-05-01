import { createApp } from "vue";
import router from "@/presentation/router";
import App from "@/presentation/App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");
