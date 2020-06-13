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
        userInfo: {
            name: '张三',
            age: 38
        },
        count: 0,
    },
    // mutations: {
    //     increment(state) {
    //         state.count++
    //     }
    // }
});

// 4.导出
export default store;

// 5.在main.js中导入store,并将store注入到vue根实例
