import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/presentation/views/home/home-page.vue";
import LoginPage from "@/presentation/views/login/login-page.vue";
import SignUp from "@/presentation/views/signup/signup-page.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next("/login");
      } else {
        next();
      }
    },
  },
  { path: "/login", name: "login", component: LoginPage },
  { path: "/signup", name: "signup", component: SignUp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
