<template>
  <div>
    <br />
    <br />父组件
    <br />
    <br />
    {{url}}
    <br />
    <br />
    <hr />
    <!-- 子组件 -->
    <child v-model="url" />
  </div>
</template>

<script>
import child from "./child";
export default {
  components: {
    child
  },
  data() {
    return {
      url: "www.baidu.com"
    };
  }
};
</script>

<style>
</style>