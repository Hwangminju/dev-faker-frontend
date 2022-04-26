import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "MainView",
        component: () => import("../views/MainView.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),//2.x대를 설치하시면 작동을 안합니다.
    routes,
});
export default router;