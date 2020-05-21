
import Vue from 'vue';
import axios from 'axios';

import { getToken, removeToken } from "@/utils/token";
import router from "../router/index";




// 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

// 允许携带cookies
axios.defaults.withCredentials = true;


// 拦截器: 作用与请求发送之前
// 因此用来全局配置请求头,带上token
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = getToken();
    if (token) {
        config.headers.token = token;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
//-----------------------

// 响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.code == 206) {
        // 移除token
        removeToken();
        // 打回到登录页面
        router.push('/login')
        return
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
// 把axios加到Vue的原型中,实现全局配置axios
Vue.prototype.$axios = axios;