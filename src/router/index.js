import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@views/Welcome.vue";
import Survey from "@views/SurveyLook.vue";
import QuestionGenerator from "@views/QuestionGenerator.vue";
import Auth from "@views/Auth.vue";

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/welcome",
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Dashboard,
    meta: { requiresAuth: false },
  },
  {
    path: "/survey",
    name: "Survey",
    component: Survey,
    meta: { requiresAuth: false },
  },
  {
    path: "/question-generator",
    name: "QuestionGenerator",
    component: QuestionGenerator,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: Auth,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  // // Check if the route requires authentication and if the user is not logged in
  // if (to.meta.requiresAuth && !localStorage.getItem("token")) {
  //   next("/signin"); // Redirect to signin page
  // } else if (to.name === "Signin" && localStorage.getItem("token")) {
  //   next("/dashboard"); // Redirect to dashboard if user tries to visit signin page while logged in
  // } else {
  //   next(); // Proceed to the next middleware
  // }

  if (to.meta.requiresAuth) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
