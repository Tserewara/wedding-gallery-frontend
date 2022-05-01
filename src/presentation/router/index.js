import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/presentation/views/home-page.vue";
import LoginPage from "@/presentation/views/login-page.vue";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/login", name: "login", component: LoginPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
