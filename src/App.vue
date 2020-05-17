<template>
  <div>
    <!-- 设置路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>



<style lang="less">
// 导入全局样式
@import url("./styles/base.less");
</style>
