<template>
  <CommonModal ref="commonModal">
    <div class="content-container">
      <span class="title">로그인</span>
    </div>
    <v-form>
      <!-- ID Template -->
      <div class="mx-3">
        <div class="mx-3">
          <font-awesome-icon icon="user" />
          <span class="ml-2">ID</span>
        </div>
        <div class="mx-1">
          <v-text-field
            placeholder="아이디"
            v-model="userId"
            required
          ></v-text-field>
        </div>
      </div>

      <!-- Password Template -->
      <div class="mx-3">
        <div class="mx-3">
          <font-awesome-icon icon="key" />
          <span class="ml-2">Password</span>
        </div>
        <div class="mx-1">
          <v-text-field
            placeholder="비밀번호"
            type="password"
            v-model="userPassword"
            required
          ></v-text-field>
        </div>
      </div>

      <!-- OK Button Template -->
      <v-card-actions>
        <v-btn
          color="#2c4f91"
          dark
          large
          block
          @click="submit"
        >
        OK
        </v-btn>
      </v-card-actions>

      <!-- Cancel Button Template -->
      <v-card-actions>
        <v-btn
          color="#2c4f91"
          dark
          large
          block
          @click="cancel"
        >
        Cancel
        </v-btn>
      </v-card-actions>
    </v-form>
    <div class="buttons-container">
      <!-- <button class="btn confirm" @click="confirm">확인</button> -->
      <!-- <button class="btn cancel" @click="cancel">취소</button> -->
    </div>

    <!-- Loading Template -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading">
        <FadeLoader />
      </div>
    </div>
  </CommonModal>
</template>

<script>
import CommonModal from "@/components/user/CommonModal.vue";
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
    name: "LoginModal",
    components: {
        CommonModal, FadeLoader
    },
    // 렌더링할 텍스트를 가져옵니다.
    props: {
        content: Array,
    },
    setup() {
        const store = useStore();

        // 자식 컴포넌트(CommonModal)를 핸들링하기 위한 ref
        const commonModal = ref(null);
        // Promise 객체를 핸들링하기 위한 ref
        const resolvePromise = ref(null);
        let userId = ref("");
        let userPassword = ref("");

        let isLoading = computed(() => store.getters.getLoading);

        const show = () => {
            // commonModal을 직접 컨트롤합니다.
            commonModal.value.open();
            // Promise 객체를 사용하여, 현재 모달에서 확인, 취소의
            // 응답이 돌아가기 전까지 작업을 기다리게 할 수 있습니다.
            return new Promise((resolve) => {
                // resolve 함수를 담아 외부에서 사용합니다.
                resolvePromise.value = resolve;
            });
        };

        const submit = async () => {
            // 사용자 로그인 정보 담아서 부모 컴포넌트로 전달
            // json-server --watch mock.json
            
            // spinner 로딩 시작
            store.commit("startLoading");
            await axios.post("https://dev-faker-be.herokuapp.com/users/login", {
                user_id: userId.value,
                user_pw: userPassword.value
            }, {
                headers: {
                    "accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin" : '*'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    // 로그인 성공시 처리해줘야할 부분
                    store.commit("setUserInfo", {
                        userId: userId.value,
                        token: data.token
                    });

                    localStorage.setItem("userId", store.getters.getUserId);
                    localStorage.setItem("token", store.getters.getToken);
                    localStorage.setItem("loginStatus", store.getters.getLoginStatus);
                }

                commonModal.value.close();
                resolvePromise.value(true);
            });
            // spinner 로딩 중지
            store.commit("stopLoading");
        };

        const cancel = () => {
            commonModal.value.close();
            resolvePromise.value(false);
        };

        return { 
            commonModal,
            FadeLoader,
            show, 
            submit, 
            cancel,
            userId,
            userPassword,
            isLoading
        };
    },
};
</script>

<style scoped>
.content-container {
    margin-bottom: 30px;
}
.title {
    font-size: 25px;
}
.loading {
    z-index: 2;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}
</style>