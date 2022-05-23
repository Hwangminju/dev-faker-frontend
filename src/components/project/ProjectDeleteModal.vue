<template>
  <Modal width="680px" @close="onClose">
    <!-- Modal Header -->
    <template #modal-header>
      <div class="modal-header">
        <p>Delete Project</p>
        <button @click="onClose"><img :src="require('@/assets/images/close_btn.png')" alt="" /></button>
      </div>
    </template>

    <!-- Modal Body -->
    <template #modal-body>
      <div class="modal-body">
        <div class="project-name">
          <p class="project-name-label">Project Name : {{ projectInfo.projectName }}</p>
        </div>
        <div class="project-contents">
          <p class="project-contents-label">정말 삭제하시겠습니까?</p>
        </div>
      </div>
    </template>

    <!-- Modal Footer -->
    <template #modal-footer>
      <div class="modal-footer">
        <button class="confirm" @click="confirm">OK</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import { defineComponent, defineAsyncComponent, onMounted, computed , ref} from 'vue';
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  components: {
      Modal: defineAsyncComponent(() => import('@/components/share/Modal.vue')),
  },
  props: {
    projectName: String,
    proijectNamespace: String,
    projectId: String
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const onClose = () => {
      emit('close');
    }

    let projectInfo = ref({
      projectName: props.projectName,
      projectNamespace: props.projectNamespace,
      projectId: props.projectId
    });

    projectInfo.value.projectName = computed(() => props.projectName);
    projectInfo.value.projectNamespace = computed(() => props.projectNamespace);
    projectInfo.value.projectId = computed(() => props.projectId);

    onMounted(() => {
      getProjectInfo();
    })

    const getProjectInfo = async () => {
      // spinner 로딩 시작
      store.commit("startLoading");
      await axios.get("https://dev-faker-be.herokuapp.com/project/" + props.projectNamespace, {
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
        }
      });
      // spinner 로딩 중지
      store.commit("stopLoading");
    };

    const doEdit = async () => {
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
          "Authentication": 'Bearer ' + localStorage.getItem("token")
        }
      })
      .then(res => {
        if (res.status === 200) {
          let data = res.data;
          console.log("프로젝트 수정 완료", data);

          store.commit("editProject", {
            projectName: projectInfo.value.projectName,
            projectNamespace: projectInfo.value.projectNamespace
          });

          localStorage.setItem("projectName", store.getters.getProjectName);
          localStorage.setItem("projectNamespace", store.getters.getProjectNamespace);
        }
      });
      // spinner 로딩 중지
      store.commit("stopLoading");
      emit('close');
    };

    return {
      onClose,
      projectInfo,
      doEdit
      };
    },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables';

.modal-header {
  background: $ds-color-cgrey;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  // border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  button {
    display: flex;
    align-items: center;
  }
}
.modal-body {
  background: #fff;
  padding: 22px 1.5rem;

  .project-name {
    display: flex;
    align-items: center;
    padding-bottom: 15px;

    .project-name-label {
      flex: 1 0 auto;
      width: 100%;
      max-width: 100%;
      text-align: center;
      padding: 0 0.5rem;
      font-size: 1rem;
    }
  }

  .project-contents {
    display: flex;
    align-items: center;

    .project-contents-label {
      flex: 1 0 auto;
      width: 100%;
      max-width: 100%;
      text-align: center;
      padding: 0 0.5rem;
      font-size: 0.875rem;
    }
  }
}

.modal-footer {
  display: flex;
  align-items: center;
  background: #fff;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);

  button {
    margin-left: 0.25rem;
    color: #fff;
    background: $ds-color-primary;
    padding: 0.5rem 1.25rem;
    border-radius: 0.125rem;
    font-size: 0.75rem;
    &.cancel {
      padding: 0.5rem 0.75rem;
      margin-left: 0.25rem;
      background: $ds-color-dark-purple;
    }
  }
}

.activeType {
  background: #ff0000;
}
</style>
