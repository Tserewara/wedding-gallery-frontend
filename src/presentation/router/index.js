import { createRouter, createWebHistory } from "vue-router";
import GalleryHome from "@/presentation/views/gallery-home.vue";

const routes = [{ path: "/", name: "home", component: GalleryHome }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
