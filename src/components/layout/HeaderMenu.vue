<template>
    <v-row class="header">
        <v-col>
            <span class="title">Dev-Faker</span>
        </v-col>
        <v-spacer />
        <v-col>
            <div>
                <button class="menu"><span>Guide</span></button>
                <button class="menu" @click="doRegister">   
                    <span>회원가입</span
                ></button>
                <button class="menu" v-if="logined.status === false" @click="doLogin"><span>로그인</span></button>
                <button class="menu" v-else @click="doLogout"><span>로그아웃</span></button>
                
                <span class="user" v-show="logined.status === true">{{ logined.user }}</span>
            </div>
        </v-col>
    </v-row>
    <LoginModal ref="login_modal" :content="loginModalTitle" />
    <RegisterModal ref="register_modal" :content="registerModalTitle" />
</template>

<script>
import { /*computed,*/ reactive } from "vue";
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
        const loginModalTitle = ref([
            "LOGIN",
            "로그인을 진행해 주세요."
        ]);
        const registerModalTitle = ref([
            "REGISTER",
            "회원가입을 진행해 주세요."
        ]);
        var logined = reactive({
            user: store.state.userId,
            status: store.state.loginStatus
        });

        // async-await을 사용하여, Modal로부터 응답을 기다리게 된다.
        const doLogin = async () => {
            const ok = await login_modal.value.show();
            if (ok) { 
                console.log(store.state);
                logined.user = store.state.userId;
            } else {
                // result.value = "로그인 취소";
            }
        };

        const doLogout = () => {
            store.commit("removeUserInfo");
        }

        const doRegister = async () => {
            const ok = await register_modal.value.show();
            if (ok) {
                console.log(store.state.userId);
                logined.user = store.state.userId;
            } else {
                // result.value = "로그인 취소";
            }
        };

        return {
            login_modal,
            register_modal,
            doLogin,
            doLogout,
            doRegister,
            loginModalTitle,
            registerModalTitle,
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
</style>