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
      children: [
        {
          path: "",
          name: "home",
          components: {
            default: HomeView,
            rightDrawer: AnalysisView,
          },
        },
        {
          path: "add_fish",
          name: "add_fish",
          components: {
            default: HomeView,
            rightDrawer: AddFishView,
          },
        },
        {
          path: "add_plants",
          name: "add_plants",
          components: {
            default: HomeView,
            rightDrawer: AddPlantsView,
          },
        },
      ],
    },
  ],
});

export default router;
