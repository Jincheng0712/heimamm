<template>
  <div>
    子组件2
    <h2>我想喝:{{name}},价格是:{{price}}</h2>
  </div>
</template>
<script>
// 导入公共实例bus
import bus from "./bus.js";

export default {
  name: "child1",
  data() {
    return {
      name: "",
      price: ""
    };
  },
  created() {
    bus.$on("sendDrinks", obj => {
      console.log(obj);
      this.name = obj.name;
      this.price = obj.price;
    });
  }
};
</script>