import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "../components/HelloWorld.vue";
import Home from "../views/home.vue";
import Search from "../views/search.vue";

// create web history ออกมา
const routerHistory = createWebHistory();

// สร้าง route path ตรงนี้ออกมา
const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/hello",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/home",
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
];

const router = createRouter({
  history: routerHistory,
  routes,
});

export default router;
