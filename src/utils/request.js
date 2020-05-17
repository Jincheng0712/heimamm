
import Vue from 'vue';
import axios from 'axios';

// 设置基础路径
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

// 允许携带cookies
axios.defaults.withCredentials = true;

// 把axios加到Vue的原型中,实现全局配置axios
Vue.prototype.$axios = axios;