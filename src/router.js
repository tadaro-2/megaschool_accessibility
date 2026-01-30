import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Comic from "./pages/Comic.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      meta: { title: "Аудиокомиксы" }
    },
    {
      path: "/comic/:id",
      component: Comic,
      meta: { title: "Комикс" }
    }
  ]
});

router.afterEach((to) => {
  document.title = to.meta.title || "Аудиокомиксы";
});

export default router;
