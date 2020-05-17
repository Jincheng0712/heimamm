// 导入vue
import Vue from 'vue';

// 导入根组件App.vue
import App from './App.vue';

Vue.config.productionTip = false;

// 也可以在这里导入全局样式或者在APP.vue中导入
// 如果是导入less样式 需要安装less-loader来支持
// 执行指令: npm i less less-loader -D  来安装
// import './styles/base.less';

// 导入router文件里index.js的路由router,注意这里不是导包
import router from "./router/index";

// 导入 element.js
import './plugins/element.js'

// 导入 request.js (里面封装了axios)
import '@/utils/request.js'


// 一个项目会创建一个vue根实例
new Vue({
  render: h => h(App),
  // 将router挂载到vue实例
  router
}).$mount('#app');
