<template>
    <div>
        <!-- block 안의 inline만 text-align 적용 가능 -->
        <table v-for="proj in projects" :key="proj.projectName">
            <div class="proj_name">
                <span>{{ proj.projectName }}</span>
            </div>
            <tr>
                <th>Data Name</th>
                <th>Data Path</th>
                <th>수정하기</th>
            </tr>
            <tr 
                v-for="data in proj.data" 
                :key="data.dataId"
            >
                <td><span>{{ data.dataName }}</span></td>
                <td><span>{{ data.dataPath }}</span></td>
                <td><button class="edit_btn">Edit</button></td>
            </tr>
        </table>
    </div>
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
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
export default {
    name: 'ProjectList',
    components: {
        FadeLoader
    },
    setup() {
        const store = useStore();
        let projects = ref([]);
        let isLoading = computed(() => store.getters.getLoading);
        
        const showProject = () => {
            console.log("프로젝트 상세 화면 보여주기!");
        };
        
        onMounted(async () => {
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
            console.log("here", projects.value);
        });
        return {
            projects,
            FadeLoader,
            isLoading,
            showProject
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
.proj_name {
    font-size: 25px;
    text-align: left;
    margin-top: 20px;
}
.edit_btn {
    background-color: #E1E6F2;
    padding: 5px;
    border: 0.5px solid #E1ADF2;
    border-radius: 10px;
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