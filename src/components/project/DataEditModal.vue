<template>
  <Modal width="680px" @close="onClose">
    <!-- Modal Header -->
    <template #modal-header>
      <div class="modal-header">
        <p>Data Edit</p>
        <button @click="onClose"><img :src="require('@/assets/images/close_btn.png')" alt="" /></button>
      </div>
    </template>

    <!-- Modal Body -->
    <template #modal-body>
      <div class="modal-body">
        <!-- Data Name -->
        <div class="data-name">
          <p class="data-name-label">Data Name :</p>
          <input type="text" class="ds-input" 
            v-model="dataInfo.dataName" required/>
        </div>

        <!-- Data Path -->
        <div class="data-path">
          <p class="data-path-label">Data Path :</p>
          <input type="text" class="ds-input" 
            v-model="dataInfo.dataPath" required/>
        </div>

        <!-- Data Type -->
        <div class="data-type">
          <p class="data-type-label">Data Type :</p>
          <input type="text" class="ds-input" 
            v-model="dataInfo.dataType" required/>
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
</template>

<script>
import { defineComponent, defineAsyncComponent, onMounted, ref } from 'vue';
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  components: {
    Modal: defineAsyncComponent(() => import('@/components/share/Modal.vue')),
  },
  props: {
    rw: Object
  },
  emits: ['close'],
  setup(props, { emit }) {
    console.log(props.rw);
    const store = useStore();
    const onClose = () => {
      emit('close');
    }

    let dataInfo = ref({
      dataName: null,
      dataPath: null,
      dataType: null
    });
    
    let projectInfo = {};

    onMounted(() => {
      dataInfo.value = {
        dataName: props.rw.dataName,
        dataPath: props.rw.dataPath,
        dataType: props.rw.dataType
      }
    })

    /*
    const getProjectInfo = async () => {
      // spinner 로딩 시작
      store.commit("startLoading");
      await axios.get("https://dev-faker-be.herokuapp.com/project/" + props, {
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
    */

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
          console.log(data);

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
      doEdit,
      dataInfo
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

  .data-name {
    display: flex;
    align-items: center;
    padding-bottom: 15px;

    .data-name-label {
      flex: 1 0 auto;
      width: 160px;
      max-width: 160px;
      text-align: right;
      padding: 0 0.5rem;
      font-size: 0.875rem;
    }
  }

  .data-path {
    display: flex;
    align-items: center;
    padding-bottom: 15px;

    .data-path-label {
      flex: 1 0 auto;
      width: 160px;
      max-width: 160px;
      text-align: right;
      padding: 0 0.5rem;
      font-size: 0.875rem;
    }
  }

  .data-type {
    display: flex;
    align-items: center;

    .data-type-label {
      flex: 1 0 auto;
      width: 160px;
      max-width: 160px;
      text-align: right;
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
