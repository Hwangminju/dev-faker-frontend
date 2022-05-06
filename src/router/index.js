import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "MainView",
        component: () => import("../views/main/MainView.vue"),
    },
    {
        path: "/project-list",
        name: "ProjectList",
        component: () => import("../views/project/ProjectList.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;