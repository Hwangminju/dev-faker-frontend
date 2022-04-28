<template>
    <CommonModal ref="baseModal">
        <div class="content-container">
            <p v-for="text in content" :key="text">
            {{ text }}
            </p>
        </div>
        <v-form class="mt-3">
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
            <v-card-actions>
                <v-btn 
                    color="#2c4f91"
                    dark
                    large
                    block
                    @click="submit"
                >
                Login
                </v-btn>
            </v-card-actions>
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
    </CommonModal>
</template>

<script>
import CommonModal from "@/components/modal/CommonModal.vue";
import { ref } from "vue";


export default {
    name: "LoginModal",
    components: {
        CommonModal,
    },
    // 렌더링할 텍스트를 가져옵니다.
    props: {
        content: Array,
    },
    setup() {
        // 자식 컴포넌트(CommonModal)를 핸들링하기 위한 ref
        const baseModal = ref(null);
        // Promise 객체를 핸들링하기 위한 ref
        const resolvePromise = ref(null);
        var userId = ref("");
        var userPassword = ref("");

        const show = () => {
            // baseModal을 직접 컨트롤합니다.
            baseModal.value.open();
            // Promise 객체를 사용하여, 현재 모달에서 확인, 취소의
            // 응답이 돌아가기 전까지 작업을 기다리게 할 수 있습니다.
            return new Promise((resolve) => {
                // resolve 함수를 담아 외부에서 사용합니다.
                resolvePromise.value = resolve;
            });
        };

        const submit = () => {
            // 사용자 로그인 정보 담아서 부모 컴포넌트로 전달

            let saveData = {};
            // let HOST = "http://dev-faker-be.herokuapp.com";
            saveData.userId = userId;
            saveData.userPassword = userPassword;
            
            try {
                this.axios.post("/users", JSON.stringify(saveData), {
                    headers: {
                        "Content-Type": `application/json`
                    }
                })
                .then(res => {
                    if (res.status === 200) { 
                        // 로그인 성공시 처리해줘야할 부분
                        console.log("login success ->", res.data);
                    }
                }); 
            } catch (error) { 
                console.error(error);
                console.log("login failed");
            }

            baseModal.value.close();
            // 로그인 시도하면 user info 넘기기
            resolvePromise.value(true);
        };

        const cancel = () => {
            baseModal.value.close();
            resolvePromise.value(false);
        };

        return { baseModal, show, submit, cancel };
    },
};
</script>