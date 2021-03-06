import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    state: {
        userId: '',
        token: '',
        loginStatus: false,
        loading: false,
        projectName: '',
        projectNamespace: '',
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        getToken(state) {
            return state.token;
        },
        getLoginStatus(state) {
            return state.loginStatus;
        },
        getLoading(state) {
            return state.loading;
        },
        getProjectName(state) {
            return state.projectName;
        },
        getProjectNamespace(state) {
            return state.projectNamespace;
        }
    },
    mutations: {
        setUserInfo(state, value) {
            state.userId = value.userId;
            state.token = value.token;
            state.loginStatus = true;
        },
        removeUserInfo(state) {
            state.userId = '';
            state.token = '';
            state.loginStatus = false;
        },
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        // 수정된 프로젝트
        modifyProject(state, value) {
            state.projectNamespace = value.projectNamespace;
        }
    },
    plugins: [
        createPersistedState()
    ]
});
