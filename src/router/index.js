/**
 * 路由配置js
 */


// 导入vue
import Vue from 'vue';
// 导入vue-router
import VueRouter from 'vue-router';

// 导入子组件 (普通导入方式)
// import Login from '@/views/login'
// import Layout from '@/views/layout'
// import Chart from '@/views/layout/chart'
// import User from '@/views/layout/user'
// import Enterprise from '@/views/layout/enterprise'
// import Question from '@/views/layout/question'
// import Subject from '@/views/layout/subject'
// import Welcome from "@/views/layout/welcome"

// 导入子组件 (路由懒加载导入方式)
const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const Chart = () => import('@/views/layout/chart')
const User = () => import('@/views/layout/user')
const Enterprise = () => import('@/views/layout/enterprise')
const Question = () => import('@/views/layout/question')
const Subject = () => import('@/views/layout/subject')
const Welcome = () => import('@/views/layout/welcome')


// 以下是测试路由
// import Parent from '../test/parent.vue' //导入父组件
// import vModel from '../test/v-model' //导入v-model组件
// import vModelParent from '../test/v-model/parent' //导入v-model组件




Vue.use(VueRouter);

// 导入获取token方法
import { getToken } from '@/utils/token'

let router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login, meta: { title: '登录' } },

        // 后台页路由配置
        {
            path: '/layout',
            component: Layout,
            meta: { roles: ["超级管理员", "管理员", "老师", "学生"] },
            // 嵌套路由
            children: [
                {
                    path: 'welcome',
                    component: Welcome,
                    // meta是元信息
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-date',
                        fullPath: '/layout/welcome',
                        title: '个人信息'
                    }
                },

                {
                    path: 'chart',
                    component: Chart,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-pie-chart',
                        fullPath: '/layout/chart',
                        title: '数据预览'
                    }
                },

                {
                    path: 'enterprise',
                    component: Enterprise,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师',],
                        icon: 'el-icon-office-building',
                        fullPath: '/layout/enterprise',
                        title: '企业列表'
                    }
                },

                {
                    path: 'user',
                    component: User,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师',],
                        icon: 'el-icon-user',
                        fullPath: '/layout/user',
                        title: '用户列表'
                    }
                },

                {
                    path: 'question',
                    component: Question,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师', '学生'],
                        icon: 'el-icon-edit-outline',
                        fullPath: '/layout/question',
                        title: '题库列表'
                    }
                },

                {
                    path: 'subject',
                    component: Subject,
                    meta: {
                        roles: ['超级管理员', '管理员', '老师'],
                        icon: 'el-icon-notebook-2',
                        fullPath: '/layout/subject',
                        title: '学科列表'
                    }
                },
            ]
        },

        // 以下是测试路由
        // { path: '/parent', component: Parent },
        // { path: '/vmodel', component: vModel },
        // { path: '/vmodelparent', component: vModelParent },

    ]
})

// 全局前置路径导航卫士 (请求拦截器)
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
});

// 全局后置钩子(设置网页标题)
router.afterEach((to, from) => {
    document.title = to.meta.title || '黑马面面';
});

// 输出router
export default router;