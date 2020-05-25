<template>
  <div>
    子组件1
    <br />
    <br />
    <br />
    <ul>
      <!-- 1.3 子组件中使用 -->
      <li v-for="item  in list" :key="item.id">{{item.name}}----{{item.address}}</li>
    </ul>
    <br />
    <br />
    <button @click="sendValueToParent">传值给父组件</button>
    <br />
    <br />
    <button @click="sendValueToBrother">传值给兄弟组件</button>
    <br />
    <br />
  </div>
</template>
<script>
// 导入公共实例bus
import bus from "./bus.js";

export default {
  name: "child1",

  // 1.1 在子组件中定义props
  //   // a.简写
  //   props: ["list"],

  //   // b.限定传值的类型写法
  //   props: {
  //     list: Array
  //   },

  // c.复杂写法,限定传值类型,并且定义默认数据
  props: {
    list: {
      type: Array,
      // required: true
      // 默认的数据,没有传值过来,则使用默认数据
      default: function() {
        return [
          { id: 4, name: "张伦", address: "祖安" },
          { id: 5, name: "张俊炜", address: "广东靓仔" }
        ];
      }
    }
  },

  data() {
    return {};
  },
  methods: {
    sendValueToParent() {
      /**
       * 知识点2: 子组件 传值给 父组件
       * 2.1 在子组件中通过this.$emit触发自定义事件
       * 2.2 在父组件中监听自定义的事件
       * 2.3 通过监听事件的处理函数的形参接受传值
       */

      // 2.1 在子组件中通过this.$emit触发自定义事件
      // 参数1:是自定义的事件名字; 参数2:是要传递的值
      // this.$emit("sendFood", { name: "鸡腿饭", price: 20 });

      // 子组件传值父组件=>方法二
      // 在子组件中通过this.$parent 拿到父组件的实例
      // 调用父组件的方法,在传入子组件的值,达到目的
      this.$parent.getFoodValue({ name: "鸡腿饭", price: 20 });
    },

    // 传值给兄弟组件
    sendValueToBrother() {
      bus.$emit("sendDrinks", { name: "草莓波波", price: 35 });
    }
  }
};
</script>