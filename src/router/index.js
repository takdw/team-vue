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
        component: () =>
          import(/* webpackChunkName: "team-index" */ "../views/Team.vue"),
        children: [
          {
            path: "/",
            name: "Teams Show",
            component: () =>
              import(
                /* webpackChunkName: "team-show" */ "../views/Teams/Show.vue"
              ),
          },
          {
            path: ":playerId",
            name: "Player",
            component: () =>
              import(/* webpackChunkName: "player" */ "../views/Player.vue"),
          },
        ],
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
