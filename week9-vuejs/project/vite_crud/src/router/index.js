import { createRouter, createWebHistory } from "vue-router";
import Users from "../views/Users.vue";
import AddUser from "../views/AddUser.vue";
import UpdateUser from "../views/UpdateUser.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import { getAuth } from "firebase/auth";

// create web history ออกมา
// const routerHistory = createWebHistory();

// สร้าง route path ตรงนี้ออกมา
const routes = [
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/adduser",
    name: "AddUser",
    component: AddUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/updateuser/:userId",
    name: "UpdateUser",
    component: UpdateUser,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/users",
  },
  {
    path: "/",
    redirect: "/users",
  },
];

// ไป createWebHistory ตรงนี้มาแทน
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// check authentication
router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
    console.log("You are not authorized to access this area");
    next("signin"); // route ตาม path ที่เราใส่เข้าไป
  } else if (!requiresAuth && currentUser) {
    console.log("You are authorized to access this area");
    next("users"); // route ตาม path ที่เราใส่เข้าไป
  } else {
    next();
  }
});

export default router;
