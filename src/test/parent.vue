<template>
  <div style="width:1000px;height:600px;border:3px solid red;">
    我是父组件
    <br />
    <br />
    中午我们吃: {{foodName}} , 价格是: {{foodPrice}}
    <br />
    <br />
    <div style="margin-left:20px;float:left;width:400px;height:500px;border:1px solid green;">
      <!-- 1.2 在父组件中通过子组件属性传值 -->
      <!-- 2.2 在父组件中监听自定义的事件sendFood -->
      <child1 :list="dashenList" @sendFood="getFoodValue"></child1>
    </div>
    <div style="margin-right:20px;float:right;width:400px;height:500px;border:1px solid blue;">
      <child2></child2>
    </div>
  </div>
</template> 
<script>
// 导入子组件
import child1 from "./child1";
import child2 from "./child2";

export default {
  name: "parent",
  // 注册组件
  components: {
    child1,
    child2
  },
  data() {
    return {
      // 食物名字与价格
      foodName: "",
      foodPrice: "",

      /**
       * 需求: 把父组件中的dashenList传给子组件child1
       * 知识点1: 父组件 传值给 子组件
       * 步骤:
       * 1.1 在子组件中定义props
       * 1.2 在父组件中通过子组件属性传值
       * 1.3 子组件中使用
       */
      dashenList: [
        { id: 1, name: "郑千里", address: "河南南阳" },
        { id: 2, name: "王子丰", address: "湖南浏阳" },
        { id: 3, name: "唐波波", address: "湖南长沙" }
      ]
    };
  },
  methods: {
    // 2.3 通过监听事件的处理函数的形参接受传值
    getFoodValue(obj) {
      console.log(obj);
      this.foodName = obj.name;
      this.foodPrice = obj.price;
    }
  }
};
</script> 