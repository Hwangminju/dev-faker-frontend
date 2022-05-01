<template>
    <v-row class="header">
        <v-col>
            <span class="title">Dev-Faker</span>
        </v-col>
        <v-spacer />
        <v-col>
            <div>
                <button class="menu"><span>Guide</span></button>
                <button class="menu"><span>회원가입</span></button>
                <button class="menu" v-if="!isLogined.flag" @click="doLogin"><span>로그인</span></button>
                <span class="user">{{ loginedUser }}</span>
            </div>
        </v-col>
    </v-row>
    <LoginModal ref="modal" :content="loginModalTitle" />
</template>

<script>
import { computed, reactive } from "vue";
import { ref } from "vue";
import LoginModal from "../modal/user/LoginModal.vue";
import { useStore } from "vuex";
export default {
    name: "App",
    components: {
        LoginModal
    },
    setup() {
        const store = useStore();
        const modal = ref(null);
        const loginModalTitle = ref([
            "LOGIN",
            "로그인을 진행해 주세요."
        ]);
        const loginedUser = computed(() => store.state.userName);

        const isLogined = reactive({
            flag: store.state.loginStatus
        });

        // async-await을 사용하여, Modal로부터 응답을 기다리게 된다.
        const doLogin = async () => {
            const ok = await modal.value.show();
            if (ok) {
                console.log(store.state.userName);
                loginedUser.value = store.state.userName;
            } else {
                // result.value = "로그인 취소";
            }
        };

        return {
            modal,
            loginedUser,
            doLogin,
            loginModalTitle,
            isLogined
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