import { createStore } from "vuex";

export default createStore({
    state: {
        userId: '',
        userName: '',
        token: '',
        loginStatus: false
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        getUserName(state) {
            return state.userName;
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
            state.userName = value.userName;
            state.token = value.token;
        }
    }
});
 