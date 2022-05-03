import { createStore } from "vuex";

export default createStore({
    state: {
        userId: '',
        token: '',
        loginStatus: false
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
        }      
    },
    mutations: {
        setUserInfo(state, value)  {
            state.userId = value.userId;
            state.token = value.token;
            state.loginStatus = true;
        },
        removeUserInfo(state) {
            state.userId = '';
            state.token = '';
            state.loginStatus = false;
        }
    }
});
 