import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import New from "../views/New.vue";
import Record from "../views/Record.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/new",
    name: "New",
    component: New,
  },
  {
    path: "/record",
    name: "Record",
    component: Record,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
