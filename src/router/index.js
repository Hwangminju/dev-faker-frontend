import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "MainView",
    component: () => import("@/views/main/MainView.vue"),
  },
  {
    path: "/project-list",
    name: "ProjectList",
    component: () => import("@/views/project/ProjectList.vue"),
    meta: {
      authRequired: true
    }
  },
  {
    path : "/project/:projectNameSpace/data/:dataPath",
    component: () => import("@/views/data/DataList.vue"),
    meta: {
      authRequired: true
    }
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

router.beforeEach(function(to, from, next) {
	// 인증이 필요한 라우팅의 경우에는 true
  if (to.matched.some(function(routeInfo) {
    return routeInfo.meta.authRequired;
  })) {
    const jwtPayload = parseJwt(localStorage.getItem("token"));
    
    // 다음 라우터로 이동을 허용
    if (jwtPayload.exp >= Date.now()/1000) {
      next();
    } else {
      store.commit("removeUserInfo");
      localStorage.removeItem('vuex');
      alert("로그인을 먼저 진행해 주세요.");
      // store의 user info 삭제
      router.push({name: 'MainView'});
    }
  } else {
    next(); // 페이지 전환
  }
});

export default router;