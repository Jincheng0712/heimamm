// 导入vue
import Vue from 'vue';
// 导入vue-router
import VueRouter from 'vue-router';

// 导入子组件
import Login from '@/views/login'
import Layout from '@/views/layout'

Vue.use(VueRouter);

let router = new VueRouter({
    routes: [
        { path: '*', component: Login },
        { path: '/login', component: Login },
        { path: '/layout', component: Layout },
    ]
})

// 输出router
export default router;