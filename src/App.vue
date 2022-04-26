<template>
    <v-app>
        <v-app-bar>
            <router-link :to="/">Dev-Faker</router-link>
            <v-spacer></v-spacer>
            <v-btn><span class="gnb">Guide</span></v-btn>
            <v-btn><span class="gnb">로그인</span></v-btn>
            <v-btn><span class="gnb">회원가입</span></v-btn>
        </v-app-bar>
        <v-main>
            <!--ModalView v-if="!isLogin" @close-modal="isLogin = true">
                <LoginModal></LoginModal>
            </ModalView-->
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
//import LoginModal from "./components/modal/login/LoginModal";
//import ModalView from "./components/modal/ModalView";
export default {
    name: 'App',
    data: () => ({
        isLogin: false
    }),
    components: {
        //LoginModal, ModalView
    }
}
</script>

<style>
.gnb {
    margin: 0 10px 0 10px;
}
</style>