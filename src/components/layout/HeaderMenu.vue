<template>
    <v-row class="header">
        <v-col>
            <button class="title">
                <router-link to="/">
                    <span>Dev-Faker</span>
                </router-link>
            </button>
        </v-col>
        <v-spacer />
        <v-col>
            <div>
                <button class="menu">
                    <router-link to="/project-list">
                        <span>프로젝트</span>
                    </router-link>
                </button>
                <button class="menu"><span>Guide</span></button>
                <button class="menu" @click="doRegister"><span>회원가입</span></button>
                
                <div v-if="logined.status === false" class="inline">
                    <button @click="doLogin" class="menu"><span>로그인</span></button>
                </div>
                <div v-else class="inline">
                    <button @click="doLogout" class="menu"><span>로그아웃</span></button>
                    <font-awesome-icon icon="user" class="mr-2"/>
                    <span class="user">{{ logined.user }}</span>
                </div>
            </div>
        </v-col>
    </v-row>
    <LoginModal ref="login_modal" />
    <RegisterModal ref="register_modal" />
</template>

<script>
import { ref } from "vue";
import LoginModal from "../modal/user/LoginModal.vue";
import RegisterModal from "../modal/user/RegisterModal.vue";
import { useStore } from "vuex";
export default {
    name: "App",
    components: {
        LoginModal,
        RegisterModal
    },
    setup() {
        const store = useStore();
        const login_modal = ref(null);
        const register_modal = ref(null);

        var logined = ref({
            user: store.state.userId,
            status: store.state.loginStatus
        });

        // async-await을 사용하여, Modal로부터 응답을 기다리게 된다.
        const doLogin = async () => {
            const ok = await login_modal.value.show();
            if (ok) { 
                logined.value.user = store.getters.getUserId;
                logined.value.status = true;
                console.log(logined);
            } else {
                // result.value = "로그인 취소";
            }
        };

        const doLogout = () => {
            store.commit("removeUserInfo");
            logined.value.user = null;
            logined.value.status = store.getters.getLoginStatus;
            // logined.value에도 반영이 바로 되야 함.
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
            register_modal,
            doLogin,
            doLogout,
            doRegister,
            logined
        };
    },
};
// https://kyounghwan01.github.io/blog/Vue/vue3/composition-api-vuex/#전역-action-mutation-실행
</script>

<style scoped>
.title {
    font-size: 40px;
}
.menu {
    font-size: 20px;
    margin-top: 10px;
    margin-right: 20px;
}
.header {
    background-color: lightgray;
    padding: 10px;
}
.user {
    color: indigo;
}
.inline {
    display: inline;
}
a {
    text-decoration: none;
    color: black;
}
</style>