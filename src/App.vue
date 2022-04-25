<template>
    <v-app>
        <v-app-bar>
            <span class="ml-5" style="font-size: 30px">Dev-Faker</span>
            <v-spacer></v-spacer>
            <span class="gnb">Guide</span>
            <span class="gnb">로그인</span>
            <span class="gnb">회원가입</span>
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
    margin: 0 15px 0 20px;
}
</style>