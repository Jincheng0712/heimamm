/**
 * vuex仓库
 */

// 1.导入
import Vue from 'vue';
import Vuex from 'vuex';

// 2.use
Vue.use(Vuex);

// 3.创建
const store = new Vuex.Store({
    // state是状态,也就是存放数据的地方
    state: {
        // 定义将来仓库中要操作的数据
        userInfo: {}
    },
    // 所有获取仓库数据的方法都写在getters里面
    getters: {
        getUserInfo(state, ) {
            return state.userInfo;
        }
    },
    // 所有操作仓库数据的方法都写在mutations里面
    mutations: {
        // state代表上面的state对象,userInfo代表要传递过来的用户信息
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },

});

// 4.导出
export default store;

// 5.在main.js中导入store,并将store注入到vue根实例
