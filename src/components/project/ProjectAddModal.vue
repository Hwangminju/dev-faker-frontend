<template>
  <Modal width="680px" @close="onClose">
    <template #modal-header>
      <div class="modal-header">
        <p>Add Create</p>
        <button @click="onClose"><img :src="require('@/assets/images/close_btn.png')" alt="" /></button>
      </div>
    </template>

    <template #modal-body>
      <div class="modal-body">
        <div class="project-name">
          <p class="project-name-label">Project Name :</p>
          <input type="text" class="ds-input" v-model="projectInfo.projectName" />
        </div>
        <div class="project-namespace">
          <p class="project-namespace-label">Project NameSpace :</p>
          <div class="project-namespace-input">
            <p class="project-namespace-host"><span>faker.kt.co.kr/</span></p>
            <input type="text" class="ds-input" v-model="projectInfo.projectNamespace" />
          </div>
        </div>
      </div>
    </template>

    <template #modal-footer>
      <div class="modal-footer">
        <button @click="addProject">Add</button>
      </div>
    </template>

    <!-- Loading Template -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading">
        <FadeLoader />
      </div>
    </div>
  </Modal>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';

export default defineComponent({
  components: {
    Modal: defineAsyncComponent(() => import('@/components/share/Modal.vue')),
    FadeLoader,
  },
  props: {
    projectNamespace: String,
  },
  emits: ['close'],
  setup(props, { emit }) {
    const store = useStore();
    const onClose = () => {
      emit('close');
    };

    let projectInfo = ref({
      projectName: null,
      projectNamespace: null,
    });

    let isLoading = computed(() => store.getters.getLoading);

    const addProject = async () => {
      store.commit('startLoading');
      await axios
        .post(
          'https://dev-faker-be.herokuapp.com/project',
          {
            projectName: projectInfo.value.projectName,
            projectNamespace: projectInfo.value.projectNamespace,
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authentication: 'Bearer ' + store.getters.getToken,
            },
          }
        )
        .then(res => {
          if (res.status === 200) {
            let data = res.data;
            console.log(data);

            store.commit('modifyProject', {
              projectNamespace: projectInfo.value.projectNamespace
            });
          }
        })
        .catch(error => {
          // 오류 발생시 loading spinner 중지
          store.commit('stopLoading');
          console.log('error ->', error.response);
        });
      // spinner 로딩 중지
      store.commit('stopLoading');
      onClose();
    };

    return {
      onClose,
      projectInfo,
      addProject,
      isLoading,
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
      width: 160px;
      max-width: 160px;
      text-align: right;
      padding: 0 0.5rem;
      font-size: 0.875rem;
    }
  }

  .project-namespace {
    display: flex;
    align-items: center;

    .project-namespace-label {
      flex: 1 0 auto;
      width: 160px;
      max-width: 160px;
      text-align: right;
      padding: 0 0.5rem;
      font-size: 0.875rem;
    }

    .project-namespace-input {
      display: flex;
      width: 100%;

      .project-namespace-host {
        font-size: 0.75rem;
        padding: 8px 10px;
        background: #b4c8d4;
        border-radius: 2px 0px 0px 2px;
        flex: 1 0 auto;

        > span {
          color: #3d4167;
          letter-spacing: 0.0125rem;
        }
      }
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
    color: #fff;
    background: $ds-color-primary;
    padding: 0.5rem 1rem;
    border-radius: 0.125rem;
    font-size: 0.75rem;
    &.cancel {
      background: $ds-color-dark-purple;
    }
  }
}

.activeType {
  background: #ff0000;
}
</style>
