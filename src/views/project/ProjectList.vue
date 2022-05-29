<template>
  <div class="projects-container">
    <div class="projects">
      <!-- Project Add -->
      <div class="project-add">
        <button @click="openAddModal">Add Project</button>
      </div>

      <!-- Project List Template -->
      <div class="project-list">
        <div class="project" v-for="proj in projects" :key="proj.projectId">
          <!-- Project Item Template -->
          <div class="project-item">
            <div>
              <div class="project-name">{{ proj.projectName }}</div>
              <div class="project-name-space">{{ proj.projectNamespace }}</div>
            </div>
            <div>
              <div class="project-edit">
                <button @click="editProject(proj.projectNamespace)">EDIT</button>
              </div>
              <div class="project-delete">
                <button @click="deleteProject(proj.projectName, proj.projectNamespace, proj.projectId)">DELETE</button>
              </div>
            </div>
          </div>

          <!-- Project Data List Template -->
          <div class="project-data-list">
            <div class="project-data" v-for="data in proj.data" :key="data.dataId">
              <div>
                <div class="data-name">
                  <span>{{ data.dataName }}</span>
                </div>
              </div>
              <div>
                <div class="data-path">
                  <span>{{ data.dataPath }}</span>
                </div>

                <!-- Project Data Edit Button -->
                <div class="data-edit">
                  <router-link :to="'/project/' + proj.projectNamespace + '/data/' + data.dataPath">
                    <button><font-awesome-icon icon="pen-to-square" /></button>
                  </router-link>
                </div>
                <div class="data-delete">
                  <button><font-awesome-icon icon="trash-can" /></button>
                </div>
              </div>
            </div>
          </div>

          <!-- Project Data Add -->
          <div class="data-add">
            <router-link
              :to="{ name: 'ProjectDataCreate', params: { projectNamespace: proj.projectNamespace } }"
              class="data-add-btn"
            >
              <span>Add Data</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Template -->
    <teleport to="#modals" v-if="isEditModal">
      <ProjectEditModal @close="closeEditModal" :projectNamespace="projectNamespace" />
    </teleport>
    <teleport to="#modals" v-if="isDeleteModal">
      <ProjectDeleteModal
        @close="closeDeleteModal"
        :projectName="projectName"
        :projectNamespace="projectNamespace"
        :projectId="projectId"
      />
    </teleport>
    <teleport to="#modals" v-if="isAddModal">
      <ProjectAddModal @close="closeAddModal" />
    </teleport>

    <!-- Loading Template -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading">
        <FadeLoader />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent, ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';

export default defineComponent({
  name: 'ProjectList',
  components: {
    ProjectAddModal: defineAsyncComponent(() => import('@/components/project/ProjectAddModal.vue')),
    ProjectEditModal: defineAsyncComponent(() => import('@/components/project/ProjectEditModal.vue')),
    ProjectDeleteModal: defineAsyncComponent(() => import('@/components/project/ProjectDeleteModal.vue')),
    FadeLoader,
  },
  setup() {
    const store = useStore();

    let projects = ref([]);
    // 프로젝트 namespace로 정보 API 호출
    let projectName = ref('');
    let projectNamespace = ref('');
    let projectId = ref('');
    const isEditModal = ref(false);
    const isDeleteModal = ref(false);
    const isAddModal = ref(false);

    let modifiedProjectNamespace = computed(() => store.getters.getProjectNamespace);

    // 프로젝트 추가, 수정, 삭제하는 경우 다시 프로젝트 리스트 조회
    watch(modifiedProjectNamespace, () => {
      showProjects();
    });

    const openAddModal = () => {
      isAddModal.value = true;
    };
    const closeAddModal = () => {
      isAddModal.value = false;
      store.commit('stopLoading');
    };
    const closeEditModal = () => {
      isEditModal.value = false;
      store.commit('stopLoading');
    };
    const closeDeleteModal = () => {
      isDeleteModal.value = false;
      store.commit('stopLoading');
    };

    let isLoading = computed(() => store.getters.getLoading);

    const editProject = namespace => {
      isEditModal.value = true;
      projectNamespace.value = namespace;
    };

    const deleteProject = (name, namespace, id) => {
      isDeleteModal.value = true;
      projectName.value = name;
      projectNamespace.value = namespace;
      projectId.value = id;
    };

    const showProjects = async () => {
      // spinner 로딩 시작
      store.commit('startLoading');
      await axios
        .get('https://dev-faker-be.herokuapp.com/projects', {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authentication: 'Bearer ' + localStorage.getItem('token'),
          },
        })
        .then(res => {
          if (res.status === 200) {
            let project_list = res.data.response;

            project_list.sort(function(a, b) { // 내림차순
              return a.projectUpdated > b.projectUpdated ? -1 : a.projectUpdated < b.projectUpdated ? 1 : 0;
            });
            projects.value = project_list;
          }
        })
        .catch(error => {
          // 오류 발생시 loading spinner 중지
          store.commit('stopLoading');
          console.log('error ->', error.response);
        });
      // spinner 로딩 중지
      store.commit('stopLoading');
    };

    onMounted(() => {
      showProjects();
    });

    return {
      projects,
      FadeLoader,
      isLoading,
      editProject,
      deleteProject,
      projectName,
      projectNamespace,
      projectId,
      isEditModal,
      isDeleteModal,
      isAddModal,
      closeEditModal,
      openAddModal,
      closeAddModal,
      closeDeleteModal,
      modifiedProjectNamespace,
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

.projects-container {
  width: 100%;

  .projects {
    margin: 0 auto;
    width: 1280px;

    .project-add {
      display: flex;
      justify-content: flex-end;
      margin-top: 3rem;
      margin-bottom: 3rem;

      button {
        padding: 0.5rem 3rem;
        background: #2d5895;
        color: #fff;
        border-radius: 0.25rem;
      }
    }

    .project-list {
      width: auto;

      .project {
        margin-bottom: 3rem;

        .project-item {
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

            .project-name {
              margin-right: 1rem;
            }

            .project-name-space {
              color: #cacaca;
            }

            .project-edit {
              padding: 0.25rem 1.5rem;
              border: 1px solid #ffffff;
              border-radius: 0.25rem;
              font-size: 0.875rem;
            }

            .project-delete {
              margin-left: 0.25rem;
              padding: 0.25rem 1rem;
              border: 1px solid #ffffff;
              border-radius: 0.25rem;
              font-size: 0.875rem;
            }
          }
        }

        .project-data-list {
          border-radius: 0.25rem;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;

          .project-data {
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

            > div:nth-child(2) {
              display: flex;
              align-items: center;
            }

            .data-path {
              margin-right: 1rem;
              padding: 0.25rem 1rem;
            }

            .data-edit {
              padding: 0.25rem 1rem;

              a {
                color: black;
              }
            }

            .data-delete {
              button {
                padding: 0.25rem 1rem;
                color: #ff0000;
              }
            }
          }
        }

        .data-add {
          display: flex;
          justify-content: center;
          .data-add-btn {
            padding: 0.5rem 3rem;
            background: #5fa320;
            color: #fff;
            border-radius: 0.25rem;
            border-top-right-radius: 0px;
            border-top-left-radius: 0px;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
