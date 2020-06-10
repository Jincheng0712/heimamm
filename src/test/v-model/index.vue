<template>
  <!-- 如何不用v-model实现双向数据绑定 -->
  <div>
    测试v-model
    <!-- <input type="text" v-model="name" /> -->
    <!-- 
        1.数据模型到视图:  用:value="name"实现
        2.视图到数据模型: @input="changeValue"监听input并把value赋值给name
    -->
    <input :value="name" @input="changeValue" type="text" />
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      name: "张三"
    };
  },
  methods: {
    changeValue(e) {
      this.name = e.target.value;
    }
  }
};
</script>

<style>
</style>