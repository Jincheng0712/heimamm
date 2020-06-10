/**
 * 路由配置js
 */


// 导入vue
import Vue from 'vue';
// 导入vue-router
import VueRouter from 'vue-router';

// 导入子组件
import Login from '@/views/login'
import Layout from '@/views/layout'

import Chart from '@/views/layout/chart'
import User from '@/views/layout/user'
import Enterprise from '@/views/layout/enterprise'
import Question from '@/views/layout/question'
import Subject from '@/views/layout/subject'
import Welcome from "@/views/layout/welcome"


// 以下是测试路由
import Parent from '../test/parent.vue' //导入父组件
import vModel from '../test/v-model' //导入v-model组件
import vModelParent from '../test/v-model/parent' //导入v-model组件




Vue.use(VueRouter);

// 导入获取token方法
import { getToken } from '@/utils/token'

let router = new VueRouter({
    routes: [
        { path: '/', component: Login },
        { path: '/login', component: Login },

        // 后台页路由配置
        {
            path: '/layout',
            component: Layout,
            // 嵌套路由
            children: [
                { path: 'welcome', component: Welcome },
                { path: 'chart', component: Chart, },
                { path: 'user', component: User, },
                { path: 'enterprise', component: Enterprise, },
                { path: 'question', component: Question, },
                { path: 'subject', component: Subject, },
            ]
        },

        // 以下是测试路由
        { path: '/parent', component: Parent },
        { path: '/vmodel', component: vModel },
        { path: '/vmodelparent', component: vModelParent },

    ]
})

// 全局路径导航卫士 (请求拦截器)
router.beforeEach((to, from, next) => {
    // console.log('到哪里去', to);
    // console.log('从哪里来', from);
    if (to.fullPath == '/login') {
        next();
    } else {
        const token = getToken();
        if (token) {
            next();
        } else {
            alert('请登录');
            next('/login');
        }
    }
})

// 输出router
export default router;