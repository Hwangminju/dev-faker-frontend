<template>
    <div class="mt-10">
        <!-- block 안의 inline만 text-align 적용 가능 -->
        <div>
            <table v-for="proj in projects" :key="proj.projectId" class="mt-5">
                <div class="top">
                    <span class="proj_name">{{ proj.projectName }}</span>
                    <button><font-awesome-icon 
                        icon="file-lines"
                        class="info_btn" 
                        @click="showProjectInfo(proj.projectNamespace)"
                    /></button>
                </div>
                <tr>
                    <th>Data Name</th>
                    <th>Data Path</th>
                    <th>수정</th>
                </tr>
                <tr 
                    v-for="data in proj.data" 
                    :key="data.dataId"
                >
                    <td><span>{{ data.dataName }}</span></td>
                    <td><span>{{ data.dataPath }}</span></td>
                    <td><font-awesome-icon icon="pen" class="title_icon" /></td>
                </tr>
            </table>
        </div>
    </div>
    <ProjectInfoModal ref="project_info_modal" />
    <div v-if="isLoading" class="loading-container">
        <div class="loading">
            <FadeLoader />
        </div>
    </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import ProjectInfoModal from "@/components/modal/project/ProjectInfoModal.vue";
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
export default {
    name: 'ProjectList',
    components: {
        FadeLoader,
        ProjectInfoModal,
    },
    setup() {
        const store = useStore();
        let projects = ref([]);
        const project_info_modal = ref(null);
        let isLoading = computed(() => store.getters.getLoading);
        // 프로젝트 namespace로 정보 API 호출
        let namespace = ref("");

        const showProjectInfo = async (projectNamespace) => {
            store.commit("setProjectNamespace", projectNamespace);
            const ok = await project_info_modal.value.show();
            if (ok) { 
                console.log("project 수정 완료");
                // Refresh page
                showProjects();
            } else {
                // result.value = "로그인 취소";
            }
        };

        const showProjects = (async() => {
            // spinner 로딩 시작
            store.commit("startLoading");
            await axios.get("https://dev-faker-be.herokuapp.com/projects", {
                headers: {
                    "accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin" : '*',
                    "Authentication": 'Bearer ' + store.getters.getToken
                }
            })
            .then(res => {
                if (res.status === 200) {
                    projects.value = res.data;
                }
            });
            // spinner 로딩 중지
            store.commit("stopLoading");
        })
        
        onMounted(() => {
            showProjects();
        });

        return {
            projects,
            FadeLoader,
            isLoading,
            showProjectInfo,
            project_info_modal,
            namespace
        }
    }
}
</script>

<style>
table {
    width: 100%;
    padding: 20px;
}
th {
    background-color: #F5EEFA;
}
td, th {
    padding: 10px;
    border: 0.5px solid #D4B2D9;
}
body {
    padding: 1rem;
}
.top {
    text-align: left;
}
.proj_name {
    font-size: 20px;
}
.info_btn {
    background-color: #E1E6F2;
    border: 0.5px solid #E1ADF2;
    border-radius: 10px;
    padding: 5px;
    margin-left: 10px;
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