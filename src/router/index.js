import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@views/Welcome.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/welcome",
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth) {
    return;
  } else {
    next();
  }
});

export default router;
