<template>
  <div class="data-container">
    <div class="data">
      <div class="data-edit">
        <!-- Row Add -->
        <div class="row-add">
          <button>Add Row</button>
        </div>

        <!-- 수정 완료 -->
        <div class="edit-done">
          <button>DONE</button>
        </div>
      </div>

      <!-- Rows Template -->
      <div class="row-list">
        <div class="row">

          <!-- Data Info -->
          <div class="row-list-header">
            <div>
              <div class="row-data-name">{{ data.dataName }}</div>
            </div>
            <!-- Project Data Edit Button -->
            <div>
              <!--div class="row-data-edit">
                <button @click="editData(data)">EDIT</button>
              </div>
              <div class="row-data-delete">
                <button>DELETE</button>
              </div-->
            </div>
          </div>

          <!-- Row Item List Template -->
          <div class="row-item-list">
            <!-- Project Item Template -->
            <div class="row-item-data" v-for="row in data.list" :key="row.dataId">
              <div>
                <div class="item-id">{{ row.item.itemId }}</div>
                <div class="item-type-name">{{ row.item.itemOption.typeName }}</div>
              </div>
              <!-- Project Category Template -->
              <div>
                <div class="category-name">{{ row.categoryName }}</div>
              </div>
              <!-- Project Data Edit/Delete -->
              <div>
                <div class="row-edit">
                  <button @click="editData(row)">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                </div>
                <div class="row-delete">
                  <button><font-awesome-icon icon="trash-can" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <teleport to="#modals" v-if="isEditModal">
      <DataEditModal @close="closeEditModal" :rw="rw" />
    </teleport>
  </div>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";

export default defineComponent({
  name: "DataList",
  components: {
    DataEditModal: defineAsyncComponent(() => import('@/components/project/DataEditModal.vue')),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const projectNamespace = computed(() => route.params.projectNameSpace);
    const dataPath = computed(() => route.params.dataPath);

    const closeEditModal = () => { isEditModal.value = false; }

    let rw = ref("");
    const isEditModal = ref(false);
    
    let data = ref({});
    let isLoading = computed(() => store.getters.getLoading);

    const editData = (row) => {
      isEditModal.value = true;
      rw.value = row;
    };

    const showData = async () => {
      // spinner 로딩 시작
      store.commit("startLoading");
      await axios
        .get("https://dev-faker-be.herokuapp.com/project/" + projectNamespace.value + "/data/" + dataPath.value, {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authentication: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(res => {
          if (res.status === 200) {
            data.value = res.data.response;
          }
        });
      // spinner 로딩 중지
      store.commit("stopLoading");
    };

    onMounted(() => {
      showData();
    });

    return {
      data,
      rw,
      FadeLoader,
      isLoading,
      projectNamespace,
      dataPath,
      showData,
      editData,
      isEditModal,
      closeEditModal
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
td, th {
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

  .data {
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

          div:nth-child(1), div:nth-child(2) {
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

            > div:nth-child(n+1):nth-child(-n+3) {
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
