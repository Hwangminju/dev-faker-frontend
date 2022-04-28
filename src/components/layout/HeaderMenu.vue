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
                <button class="menu" @click="handleClick"><span>로그인</span></button>
            </div>
        </v-col>
    </v-row>
    <LoginModal ref="modal" :content="modalContent" />
</template>

<script>
import { ref } from "vue";
import LoginModal from "../modal/user/LoginModal.vue";
export default {
    name: "App",
    components: {
        LoginModal
    },
    setup() {
        const modal = ref(null);
        const modalContent = ref([
            "LOGIN"
    ]);
    const result = ref("");

    // async-await을 사용하여, Modal로부터 응답을 기다리게 된다.
    const handleClick = async () => {
      const ok = await modal.value.show();
      if (ok) {
        result.value = "로그인한 사용자 이름을 여기에 표시";
      } else {
        result.value = "로그인 취소";
      }
    };
    return {
      modal,
      modalContent,
      result,
      handleClick,
    };
  },
};
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
</style>