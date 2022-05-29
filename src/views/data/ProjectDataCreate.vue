<template>
  <div class="data-container">
    <DataHead 
      class="data-head" 
      :projectNamespace="projectNamespace" 
      @emitDataName="onEmitDataName"
      @emitDataPath="onEmitDataPath"
      @emitDataRows="onEmitDataRows"
      @emitDataType="onEmitDataType"
      @emitArrayCheck="onEmitArrayCheck" />
    <DataBody class="data-body" @emitDataRowList="onEmitDataRowList"/>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';

export default defineComponent({
  name: 'ProjectDataCreate',
  components: {
    DataHead: defineAsyncComponent(() => import('@/components/data/DataHead.vue')),
    DataBody: defineAsyncComponent(() => import('@/components/data/DataBody.vue')),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const projectNamespace = computed(() => route.params.projectNamespace);
    // const dataPath = computed(() => route.params.dataPath);
    let data_name = ref("");
    let data_path = ref("");

    const onEmitDataName = (dataName => { 
      console.log("here ->", dataName);
      data_name.value = dataName;
    });

    const onEmitDataPath = (dataPath => { console.log("here ->", dataPath); });
    const onEmitDataRows = (dataRows => { console.log("here ->", dataRows); });
    const onEmitDataType = (dataType => { console.log("here ->", dataType); });
    const onEmitArrayCheck = (isArray => { console.log("here ->", isArray); });
    
    const onEmitDataRowList = (dataList => { 
      console.log("here ->", data_name.value); 
      console.log("here ->", dataList); 
      router.push({name: 'ProjectList'});
    });

    let data = ref({});
    let isLoading = computed(() => store.getters.getLoading);

    const projectDataCreate = async () => {
      // 데이터 생성 axios 요청
      store.commit('startLoading');
      await axios
        .post('https://dev-faker-be.herokuapp.com/project/' + projectNamespace.value + '/data', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authentication: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(res => {
          if (res.status === 200) {
            data.value = res.data.response;
          }
        });
      // spinner 로딩 중지
      store.commit('stopLoading');
    };

    const showData = async () => {
      // spinner 로딩 시작
      store.commit('startLoading');
      await axios
        .get('https://dev-faker-be.herokuapp.com/project/' + projectNamespace.value + '/data/' + data_path.value, {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authentication: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(res => {
          if (res.status === 200) {
            data.value = res.data.response;
          }
        });
      // spinner 로딩 중지
      store.commit('stopLoading');
    };

    onMounted(() => {
      // showData();
    });

    return {
      data,
      FadeLoader,
      isLoading,
      projectNamespace,
      showData,
      projectDataCreate,
      onEmitDataName,
      onEmitDataPath,
      onEmitDataRows,
      onEmitDataType,
      onEmitArrayCheck,
      onEmitDataRowList,
      data_name,
      data_path
    };
  },
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  padding: 20px;
}
th {
  background-color: #f5eefa;
}
td,
th {
  padding: 10px;
  border: 0.5px solid #d4b2d9;
}
.top {
  text-align: left;
}
.proj_name {
  font-size: 20px;
}
.info_btn {
  background-color: #e1e6f2;
  border: 0.5px solid #e1adf2;
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

.data-container {
  width: 100%;

  :where(.data-head, .data-body) {
    margin: 0 auto;
    width: 1280px;
    padding: 2rem 0;
  }

  .data-head {
    border-bottom: 1px solid #ccc;
  }

  .data {
    display: none;
    margin: 0 auto;
    width: 1280px;

    .data-name {
      display: flex;
      margin-top: 3rem;
      margin-bottom: 3rem;

      span {
        padding: 0.5rem 3rem;
        background: #2d9895;
        color: #fff;
        border-radius: 0.25rem;
      }
    }

    .data-edit {
      display: flex;
      justify-content: flex-end;

      .row-add {
        margin-top: 3rem;
        margin-bottom: 0.25rem;

        button {
          padding: 0.5rem 2.5rem;
          background: #2d5895;
          color: #fff;
          border-radius: 0.25rem;
        }
      }

      .edit-done {
        margin-top: 3rem;
        margin-bottom: 0.25rem;
        margin-left: 0.25rem;

        button {
          padding: 0.5rem 3rem;
          background: #2d5895;
          color: #fff;
          border-radius: 0.25rem;
        }
      }
    }

    .row-list {
      width: auto;

      .row {
        margin-bottom: 1rem;

        .row-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #434f5a;
          border-radius: 0.25rem;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          color: #fff;

          div:nth-child(1),
          div:nth-child(2) {
            display: flex;

            .row-data-name {
              margin-right: 1rem;
            }

            .row-data-path {
              color: #cacaca;
            }

            .row-data-edit {
              padding: 0.25rem 1.5rem;
              border: 1px solid #ffffff;
              border-radius: 0.25rem;
              font-size: 0.875rem;
            }

            .row-data-delete {
              margin-left: 0.25rem;
              padding: 0.25rem 1rem;
              border: 1px solid #ffffff;
              border-radius: 0.25rem;
              font-size: 0.875rem;
            }
          }
        }

        .row-item-list {
          border-radius: 0.25rem;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;

          .row-item-data {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1rem;
            background: #f3f3f3;
            border: 1px solid #c4c4c4;
            border-top: 0;

            &:last-child {
              border-radius: 0.25rem;
              border-top-left-radius: 0;
              border-top-right-radius: 0;
            }

            > div:nth-child(n + 1):nth-child(-n + 3) {
              display: flex;
              align-items: center;
            }

            .category-id {
              margin-right: 1rem;
              padding: 0.25rem 1rem;
            }

            .category-name {
              padding: 0.25rem 1rem;
            }

            .item-id {
              margin-right: 1rem;
              padding: 0.25rem 1rem;
            }

            .item-type-name {
              padding: 0.25rem 1rem;
            }

            .row-edit {
              button {
                padding: 0.25rem 1rem;
                color: black;
              }
            }

            .row-delete {
              button {
                padding: 0.25rem 1rem;
                color: #ff0000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
