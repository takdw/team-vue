import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/teams",
    component: () =>
      import(/* webpackChunkName: "teams" */ "../views/Teams.vue"),
    children: [
      {
        path: "/",
        name: "Teams Index",
        component: () =>
          import(
            /* webpackChunkName: "team-index" */ "../views/Teams/Index.vue"
          ),
      },
      {
        path: ":teamId",
        name: "Teams Show",
        component: () =>
          import(/* webpackChunkName: "team-show" */ "../views/Teams/Show.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
