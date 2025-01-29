import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Tracker from "../views/Tracker.vue";
import About from "../views/About.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/tracker",
      name: "tracker",
      component: Tracker,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
  ],
});

export default router;
