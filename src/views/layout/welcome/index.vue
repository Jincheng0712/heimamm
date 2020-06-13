<template>
  <div>
    <!-- 18511111111 欢迎您 -->
    <!-- todo 展示图像 -->
    <h2>{{$store.getters.getUserInfo.username}}欢迎您!</h2>
    <br />
    <h3>您的角色是:{{$store.getters.getUserInfo.role}}</h3>
  </div>
</template>

<script>
export default {};
</script>