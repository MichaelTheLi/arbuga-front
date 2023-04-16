import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AnalysisView from "@/views/drawer/AnalysisView.vue";
import AddPlantsView from "@/views/drawer/AddPlantsView.vue";
import AddFishView from "@/views/drawer/AddFishView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      children: [
        {
          path: "",
          components: {
            default: HomeView,
            rightDrawer: AnalysisView,
          },
        },
        {
          path: "add_fish",
          components: {
            default: HomeView,
            rightDrawer: AddFishView,
          },
        },
        {
          path: "add_plants",
          components: {
            default: HomeView,
            rightDrawer: AddPlantsView,
          },
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
