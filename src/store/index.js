import Vue from "vue";
import Vuex from "vuex";
import { subdata, dataFetch } from "../utils/storage.js"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 用户的登录状态信息
        user: dataFetch('TOUTIAO_USER')
            //载入时 user等于本地储存的token 如无数据 就等于null
            // user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            subdata('TOUTIAO_USER', user)
                //把取到的数据 以json转换为字符串的类型 存到本地储存 key：TOUTIAO_USER
        }
    },
    actions: {},
    modules: {}
})

export default store