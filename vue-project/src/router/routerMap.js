/**
 * 基础路由
 * @type { *[] }
 */
import { ServerLayout } from "@/layout/index.js";

const constantRouterMap = [
  {
    path: "/",
    name: "Login",
    redirect: { name: "Login" },
    children: [
      {
        path: "/",
        name: "Login",
        component: () => import("@/pages/index.vue"),
      },
    ],
  },
  {
    path: "/plan",
    name: "Plan",
    component: ServerLayout,
    redirect: { name: "Plan" },
    children: [
      {
        path: ":username?",
        name: "Plan",
        component: () => import("@/pages/plan.vue"),
      },
    ],
  },
  {
    path: "/startLottery",
    name: "StartLottery",
    redirect: { name: "StartLottery" },
    children: [
      {
        path: "/startLottery",
        name: "StartLottery",
        component: () => import("@/pages/startLottery.vue"),
      },
    ],
  },
];

export default constantRouterMap;
