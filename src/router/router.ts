import { createRouter, createWebHistory } from "vue-router";
import mainLayoutView from "../layout/mainLayout.vue";
import notFoundviewView from "../view/notFoundview.vue";
import finishedListviewView from "../view/finishedListview.vue";
import deletedListviewView from "../view/deletedListview.vue";
import todoListViewVue from "../view/todoListView.vue";
import mainView from "../view/mainview.vue";
const routes = [
  {
    path: "/",
    name: "app",
    component: mainLayoutView,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "mainView",
        component: mainView,
        children: [
          {
            path: "/todo",
            name: "todo",
            component: todoListViewVue,
          },
          {
            path: "/finished",
            name: "finishedList",
            component: finishedListviewView,
          },
          {
            path: "/deleted",
            name: "deletedList",
            component: deletedListviewView,
          },
        ],
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

export default router;
