import { createRouter, createWebHistory } from "vue-router";
import mainLayoutView from "../layout/mainLayout.vue";
import notFoundviewView from "../view/notFoundview.vue";
import mainView from "../view/mainview.vue";
import loginviewVue from "../view/loginview.vue";
const routes = [
  {
    path: "/login",
    name: "login Page",
    component: loginviewVue,
  },
  {
    path: "/",
    name: "app",
    component: mainLayoutView,
    redirect: "/home",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/home",
        name: "mainView",
        component: mainView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    component: notFoundviewView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
