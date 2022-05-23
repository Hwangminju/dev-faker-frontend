<template>
    <!-- <v-row class="header">
        <div class="inline">
            <button class="title">
                <font-awesome-icon icon="code" class="title_icon" />
                <router-link to="/">Dev-Faker</router-link>
            </button>
        </div>
        <v-spacer />
        <div>
            <button v-show="logined.status === true" class="menu">
                <router-link to="/project-list">
                    <span>프로젝트</span>
                </router-link>
            </button>
            <button class="menu"><span>Guide</span></button>
            
            
            <div v-if="logined.status === false" class="inline">
                <button class="menu" @click="doRegister"><span>회원가입</span></button>
                <button @click="doLogin" class="menu"><span>로그인</span></button>
            </div>
            <div v-else class="inline">
                <button @click="doLogout" class="menu"><span>로그아웃</span></button>
                <font-awesome-icon icon="user" class="mr-2"/>
                <span class="user">{{ logined.user }} 님 환영합니다</span>
            </div>
        </div>
    </v-row> -->
    <div class="header-menu">
        <div class="logo">
            <router-link to="/">
                <font-awesome-icon icon="code" class="logo-icon"/><span class="logo-text">Dev-Faker</span>
            </router-link>
        </div>
        <div class="menus">
            <a href="">Guide</a>

            <!-- Login Status -->
            <template v-if="logined.status === false">
                <button @click="doRegister"><span>회원가입</span></button>
                <button @click="doLogin"><span>로그인</span></button>
            </template>

            <!-- Logout Status -->
            <template v-else>
                <router-link to="/project-list">
                    <span>프로젝트</span>
                </router-link>
                <button @click="doLogout"><span>로그아웃</span></button>
                <p>
                    <font-awesome-icon icon="user" class="mr-2"/>
                    <span class="user">{{ logined.user }} 님 환영합니다</span>
                </p>    
            </template>   
        </div>
    </div>
    <LoginModal ref="login_modal" />
    <LogoutModal ref="logout_modal" />
    <RegisterModal ref="register_modal" />
</template>

<script>

import { ref, computed, defineComponent, defineAsyncComponent} from "vue";
import { useStore } from "vuex";
import router from "@/router";

export default defineComponent({
    name: "App",
    components: {
        LoginModal: defineAsyncComponent(() => import('@/components/user/LoginModal.vue')),
        LogoutModal: defineAsyncComponent(() => import('@/components/user/LogoutModal.vue')),
        RegisterModal: defineAsyncComponent(() => import('@/components/user/RegisterModal.vue')),
    },
    setup() {
        const store = useStore();
        const login_modal = ref(null);
        const logout_modal = ref(null);
        const register_modal = ref(null);

        const logined = ref({
            user: computed(() => store.getters.getUserId),
            status: computed(() => store.getters.getLoginStatus)
        })

        // async-await을 사용하여, Modal로부터 응답을 기다리게 된다.
        const doLogin = async () => {
            const ok = await login_modal.value.show();
            if (ok) { 
                console.log("Login User ->", logined);
            } else {
                // result.value = "로그인 취소";
            }
        };

        const doLogout = async () => {
            const ok = await logout_modal.value.show();
            if (ok) {
                store.commit("removeUserInfo");
                
                router.push({name: 'MainView'});
                localStorage.removeItem('vuex');
                store.commit("stopLoading");
                // localStorage.removeItem('id');
                // localStorage.removeItem('loginStatus');
            }
        }

        const doRegister = async () => {
            const ok = await register_modal.value.show();
            if (ok) {
                console.log("register success");
            } else {
                // result.value = "회원가입 취소";
            }
        };

        return {
            login_modal,
            logout_modal,
            register_modal,
            doLogin,
            doLogout,
            doRegister,
            logined
        };
    },
})
// https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/#전역-action-mutation-실행
</script>

<style scoped>
/* .title {
    font-size: 40px;
}
.menu {
    font-size: 20px;
    margin-top: 10px;
    margin-right: 20px;
}
.header {
    background-color: lightgray;
    padding: 30px;
}
.user {
    color: indigo;
}
.inline {
    display: inline-block;
}
a {
    text-decoration: none;
    color: black;
}
.title_icon {
    margin-right: 10px;
} */

.header-menu {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem 2rem;  
    background-color: #f3f3f3; 
}

.header-menu .logo {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
}

.header-menu .logo .logo-text {
    margin-left: 1rem;
}

.header-menu .logo a {
    color: #000;
    text-decoration: none;
}

.header-menu .menus {
    display: flex;
    align-items: center;
}

.header-menu .menus a,
.header-menu .menus button,
.header-menu .menus p {
    color: #343434;
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    text-decoration: none;
    font-weight: 500;
}
</style>