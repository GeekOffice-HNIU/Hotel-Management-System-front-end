import { createStore } from "vuex";

export default createStore({
    state: {
        loginStatus: {
            isLogin: false,
            username: "",
        }
    },
    mutations: {
        setLogin(state, val) {
            state.loginStatus.isLogin = !state.loginStatus.isLogin;
            state.loginStatus.username = val;
        },
    },
    actions: {},
    modules: {},
});