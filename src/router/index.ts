import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AnalysisView from "@/views/drawer/AnalysisView.vue";
import AddPlantsView from "@/views/drawer/AddPlantsView.vue";
import AddFishView from "@/views/drawer/AddFishView.vue";
import EcosystemView from "@/views/EcosystemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: HomeView,
      },
    },
    {
      path: "/ecosystem",
      children: [
        {
          path: "",
          name: "ecosystem_home",
          components: {
            default: EcosystemView,
          },
        },
        {
          path: "analysis",
          name: "ecosystem_analysis",
          components: {
            default: EcosystemView,
            rightDrawer: AnalysisView,
          },
        },
        {
          path: "add_fish",
          name: "add_fish",
          components: {
            default: EcosystemView,
            rightDrawer: AddFishView,
          },
        },
        {
          path: "add_plants",
          name: "add_plants",
          components: {
            default: EcosystemView,
            rightDrawer: AddPlantsView,
          },
        },
      ],
    },
  ],
});

export default router;
