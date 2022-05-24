<template>
    <CommonModal ref="commonModal">
        <div class="content-container">
            <span class="title">{{ namespace }} 프로젝트</span>
        </div>
        <v-form>
            <div class="mx-3">
                <div class="mx-3">
                    <font-awesome-icon icon="address-card" />
                    <span class="ml-2">프로젝트 이름</span>
                </div>
                <div class="mx-1">
                    <div>
                        <v-text-field
                            placeholder="프로젝트 이름을 입력해 주세요."
                            v-model="projectInfo.projectName"
                            required
                        ></v-text-field>
                    </div>
                </div>
            </div>
            <div class="mx-3">
                <div class="mx-3">
                    <font-awesome-icon icon="signature" />
                    <span class="ml-2">프로젝트 네임스페이스</span>
                </div>
                <div class="mx-1">
                    <v-text-field
                        placeholder="네임스페이스를 입력해 주세요."
                        v-model="projectInfo.projectNamespace"
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
                수정
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
                취소
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
import { ref, computed, onMounted } from "vue";
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
        let projectNamespace = ref("");
        let namespace = computed(() => store.getters.getProjectNamespace);

        let projectInfo = ref(null);
        let isLoading = computed(() => store.getters.getLoading);

        onMounted(() => {
            getProjectInfo();
        })

        const getProjectInfo = async () => {
            // spinner 로딩 시작
            store.commit("startLoading");
            await axios.get("https://dev-faker-be.herokuapp.com/project/" + namespace.value, {
                headers: {
                    "accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin" : '*',
                    "Authentication": 'Bearer ' + store.getters.getToken
                }
            })
            .then(res => {
                if (res.status === 200) {
                    projectInfo.value = res.data;

                    projectName.value = projectInfo.value.projectName;
                    projectNamespace.value = projectInfo.value.projectNamespace;
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
            await axios.put("https://dev-faker-be.herokuapp.com/project", {
                projectName: projectInfo.value.projectName,
                projectNamespace: projectInfo.value.projectNamespace,
                projectId: projectInfo.value.projectId
            }, {
                headers: {
                    "accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin" : '*',
                    "Authentication": 'Bearer ' + store.getters.getToken
                }
            })
            .then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    console.log(data);
                    store.commit("getProjectNamespace", projectInfo.value.projectName);
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
            modify,
            cancel,
            isLoading,
            projectName,
            projectNamespace,
            projectInfo,
            namespace
        };
    }
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