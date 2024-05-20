import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@views/Welcome.vue";
import Survey from "@views/SurveyLook.vue";
import QuestionGenerator from "@views/QuestionGenerator.vue";
import Auth from "@views/Auth.vue";
import Dashboard from "@views/Dashboard.vue";
import Profile from "@views/Profile.vue";
import Quiz from "@views/Quiz.vue";
import ActiveVote from "@views/ActiveVote.vue";
import WordCloud from "@views/WordCloud.vue";
import Statistics from "@views/Statistics.vue";

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
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/quizzes",
    name: "Quizzes",
    component: Quiz,
    meta: { requiresAuth: true },
  },
  {
    path: "/active-vote",
    name: "ActiveVote",
    component: ActiveVote,
    meta: { requiresAuth: true },
  },
  {
    path: "/survey",
    name: "Survey",
    component: Survey,
    meta: { requiresAuth: false },
  },
  {
    path: "/:code",
    redirect: (to) => {
      if (to.params.code.length === 5) {
        return {
          path: "/survey",
          query: {
            code: to.params.code,
          },
        };
      } else {
        return { path: "/" };
      }
    },
    meta: { requiresAuth: false },
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    meta: { requiresAuth: false },
  },
  {
    path: "/word-cloud",
    name: "WordCloud",
    component: WordCloud,
    meta: { requiresAuth: true },
  },
  {
    path: "/question-generator",
    name: "QuestionGenerator",
    component: QuestionGenerator,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Auth,
    meta: { requiresAuth: false },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  console.log(token);

  if (to.meta.requiresAuth) {
    if (token === null || token === undefined) {
      next("/login");
    } else {
      next();
    }
  } else if (to.name === "Login" && token) {
    next("/welcome"); // Redirect to dashboard if user tries to visit signin page while logged in
  } else {
    next(); // Proceed to the next middleware
  }
});

export default router;
