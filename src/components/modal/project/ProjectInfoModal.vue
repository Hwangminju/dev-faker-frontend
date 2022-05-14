<template>
    <CommonModal ref="commonModal">
        <div class="content-container">
            <span class="title">{{ projectNamespace }} 프로젝트</span>
        </div>
        <v-form>
            <div class="mx-3">
                <div class="mx-3">
                    <font-awesome-icon icon="address-card" />
                    <span class="ml-2">프로젝트명</span>
                </div>
                <div class="mx-1">
                    <v-text-field
                        :readonly="modify_btn_clicked"
                        placeholder="아이디"
                        v-model="projectName"
                        required
                    >{{ projectInfo }}</v-text-field>
                </div>
            </div>
            <div class="mx-3">
                <div class="mx-3">
                    <font-awesome-icon icon="key" />
                    <span class="ml-2">Namespace</span>
                </div>
                <div class="mx-1">
                    <v-text-field
                        placeholder="비밀번호"
                        type="password"
                        v-model="projectName"
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
                    @click="modify"
                >
                OK
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
        <div v-if="isLoading" class="loading-container">
            <div class="loading">
                <FadeLoader />
            </div>
        </div>
    </CommonModal>
</template>

<script>
import CommonModal from "@/components/modal/common/CommonModal.vue";
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
    name: "ProjectInfoModal",
    components: {
        CommonModal, FadeLoader
    },
    // 렌더링할 텍스트를 가져옵니다.
    props: {

    },
    setup() {
        const store = useStore();

        // 자식 컴포넌트(CommonModal)를 핸들링하기 위한 ref
        const commonModal = ref(null);
        // Promise 객체를 핸들링하기 위한 ref
        const resolvePromise = ref(null);
        let projectName = ref("");
        const projectNamespace = ref(store.getters.getProjectNamespace);

        let projectInfo = ref(null);
        let modify_btn_clicked = ref(false);
        let isLoading = computed(() => store.getters.getLoading);

        const getProjectInfo = async () => {
            // spinner 로딩 시작
            store.commit("startLoading");
            await axios.get("https://dev-faker-be.herokuapp.com/project/" + projectNamespace.value, {
                headers: {
                    "accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin" : '*',
                    "Authentication": 'Bearer ' + store.getters.getToken
                }
            })
            .then(res => {
                if (res.status === 200) {
                    projectInfo.value = {
                        "projectName": "123",
                        "projectNamespace": "123",
                        "projectId": "0b11292c-84db-3e5b-9610-0d53e8e3aa99",
                        "projectCreated": "2022-05-10T15:47:36.655000",
                        "projectUpdated": "2022-05-13T13:22:32.291000",
                        "data": [
                            {
                            "dataName": "data6",
                            "dataPath": "data6",
                            "dataId": "0c0727c6-ccdf-3a29-a2cf-e423c8c8c518"
                            },
                            {
                            "dataName": "aa",
                            "dataPath": "aa",
                            "dataId": "ff14d1c5-9fe4-3f83-bfb1-7fff8fb15ca3"
                            }
                        ]
                    };
                }
            });
            // spinner 로딩 중지
            store.commit("stopLoading");
        };

        const show = () => {
            // commonModal을 직접 컨트롤합니다.
            commonModal.value.open();
            // Promise 객체를 사용하여, 현재 모달에서 확인, 취소의
            // 응답이 돌아가기 전까지 작업을 기다리게 할 수 있습니다.

            return new Promise((resolve) => {
                getProjectInfo();
                // resolve 함수를 담아 외부에서 사용합니다.
                resolvePromise.value = resolve;
            });
        };

        const modify = async () => {
            // 사용자 로그인 정보 담아서 부모 컴포넌트로 전달
            // json-server --watch mock.json
            
            // spinner 로딩 시작
            store.commit("startLoading");
            await axios.post("https://dev-faker-be.herokuapp.com/users/login", {
                // user_id: userId.value,
                // user_pw: userPassword.value
            }, {
                headers: {
                    "accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin" : '*'
                }
            })
            .then(res => {
                if (res.status === 200) {
                    var data = res.data;
                    console.log(data);
                }

                // commonModal.value.close();
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
            modify, 
            cancel,
            projectName,
            isLoading,
            modify_btn_clicked,
            projectNamespace,
            projectInfo
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