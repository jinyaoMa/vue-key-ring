import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Keys from "../views/Keys.vue";
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
    path: "/keys",
    name: "Keys",
    component: Keys,
    meta: {
      auth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      auth: true,
    },
  },
  {
    path: "/new",
    name: "New",
    component: New,
    meta: {
      auth: true,
    },
  },
  {
    path: "/record",
    name: "Record",
    component: Record,
    props(route) {
      return {
        id: parseInt(route.params.id),
      };
    },
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!to.params.pass) {
      next("/");
      return;
    }
  }
  next();
});

export default router;
