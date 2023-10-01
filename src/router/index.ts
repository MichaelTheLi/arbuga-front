import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AnalysisView from "@/views/drawer/AnalysisView.vue";
import AddPlantsView from "@/views/drawer/AddPlantsView.vue";
import AddFishView from "@/views/drawer/AddFishView.vue";
import EcosystemView from "@/views/EcosystemView.vue";
import FishExploreView from "@/views/FishExploreView.vue";
import FishView from "@/views/FishView.vue";
import PlantView from "@/views/PlantView.vue";
import PlantsExploreView from "@/views/PlantsExploreView.vue";

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
      path: "/fish",
      name: "fish",
      children: [
        {
          path: "explore",
          name: "explore_fish",
          components: {
            default: FishExploreView,
          },
        },
        {
          path: ":id",
          name: "fish_details",
          components: {
            default: FishView,
          },
        },
      ],
    },
    {
      path: "/plants",
      name: "plantsc",
      children: [
        {
          path: "explore",
          name: "explore_plants",
          components: {
            default: PlantsExploreView,
          },
        },
        {
          path: ":id",
          name: "plant_details",
          components: {
            default: PlantView,
          },
        },
      ],
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
