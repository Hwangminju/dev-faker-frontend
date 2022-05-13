<template>
    <CommonModal ref="commonModal">
        <div class="content-container">
            <span class="title">로그아웃</span>
        </div>
        <div class="mx-3">
            <span>로그아웃 되었습니다.</span>
        </div>
        <v-card-actions>
            <v-btn
                color="#2c4f91"
                dark
                large
                block
                @click="confirm"
            >
            OK
            </v-btn>
        </v-card-actions>
    </CommonModal>
</template>

<script>
import { ref } from "vue";
import CommonModal from "@/components/modal/common/CommonModal.vue";

export default {
    name: "LogoutModal",
    components: {
        CommonModal,
    },
    // 렌더링할 텍스트를 가져옵니다.
    props: {
        content: Array,
    },
    setup() {
        // 자식 컴포넌트(CommonModal)를 핸들링하기 위한 ref
        const commonModal = ref(null);
        const resolvePromise = ref(null);

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

        const confirm = () => {
            commonModal.value.close();
            resolvePromise.value(true);
        };

        return { 
            commonModal, 
            show, 
            confirm
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
</style>