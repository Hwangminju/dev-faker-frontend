<template>
  <Modal width="680px" @close="onClose">
    <!-- Modal Header -->
    <template #modal-header>
      <div class="modal-header">
        <p>Project Edit</p>
        <button @click="onClose"><img :src="require('@/assets/images/close_btn.png')" alt="" /></button>
      </div>
    </template>

    <!-- Modal Body -->
    <template #modal-body>
      <div class="modal-body">
        <div class="project-name">
          <p class="project-name-label">Project Name :</p>
          <input type="text" class="ds-input" v-model="projectInfo.projectName" required />
        </div>
        <div class="project-namespace">
          <p class="project-namespace-label">Project NameSpace :</p>
          <div class="project-namespace-input">
            <p class="project-namespace-host"><span>faker.kt.co.kr/</span></p>
            <input type="text" class="ds-input" v-model="projectInfo.projectNamespace" required />
          </div>
        </div>
      </div>
    </template>

    <!-- Modal Footer -->
    <template #modal-footer>
      <div class="modal-footer">
        <button @click="doEdit">Edit</button>
      </div>
    </template>
  </Modal>

  <!--Modal width="880px" @close="onClose">
      <template #modal-header>Edit Project</template>

      <template #modal-body>
          <div class="modal-body">
              <div>
                  <div>
                      <font-awesome-icon icon="address-card" />
                      <span>프로젝트 이름</span>
                  </div>
                  <div>
                      <v-text-field
                          placeholder="프로젝트 이름을 입력해 주세요."
                          v-model="projectInfo.projectName"
                          required
                      ></v-text-field>
                  </div>
              </div>
              <div>
                  <div>
                      <font-awesome-icon icon="address-card" />
                      <span>프로젝트 네임스페이스</span>
                  </div>
                  <div>
                      <v-text-field
                          placeholder="프로젝트 네임스페이스를 입력해 주세요."
                          v-model="projectInfo.projectNamespace"
                          required
                      ></v-text-field>
                  </div>
              </div>
          </div>
      </template>
      <template #modal-footer> 
          <div class="modal-footer">
            <div>
                <button @click="doEdit">수정</button>
            </div>
            <div>
                <button @click="$emit('close')">닫기</button>
            </div>
          </div>
      </template>
  </Modal-->
</template>

<script>
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
  components: {
    Modal: defineAsyncComponent(() => import('@/components/share/Modal.vue')),
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
      projectId: null,
    });

    onMounted(() => {
      getProjectInfo();
    });

    const getProjectInfo = async () => {
      // spinner 로딩 시작
      store.commit('startLoading');
      await axios
        .get('https://dev-faker-be.herokuapp.com/project/' + props.projectNamespace, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authentication: 'Bearer ' + store.getters.getToken,
          },
        })
        .then(res => {
          if (res.status === 200) {
            projectInfo.value.projectName = res.data.response.projectName;
            projectInfo.value.projectNamespace = res.data.response.projectNamespace;
            projectInfo.value.projectId = res.data.response.projectId;
          }
        });
      // spinner 로딩 중지
      store.commit('stopLoading');
    };

    const doEdit = async () => {
      store.commit('startLoading');
      await axios
        .put(
          'https://dev-faker-be.herokuapp.com/project',
          {
            projectName: projectInfo.value.projectName,
            projectNamespace: projectInfo.value.projectNamespace,
            projectId: projectInfo.value.projectId,
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              Authentication: 'Bearer ' + localStorage.getItem('token'),
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
        });
      // spinner 로딩 중지
      store.commit('stopLoading');
      emit('close');
    };

    return {
      onClose,
      projectInfo,
      doEdit,
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
