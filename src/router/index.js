import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "MainView",
        component: () => import("../views/MainView.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;