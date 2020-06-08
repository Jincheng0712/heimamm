<template>
  <div class="questionType">
    <!-- 单选 -->
    <div v-if="questionForm.type==1">
      <div v-for="item in questionForm.select_options" :key="item.label" class="item">
        <!-- radio -->
        <el-radio v-model="questionForm.single_select_answer" :label="item.label">{{item.label}}</el-radio>
        <!-- input -->
        <el-input v-model="item.text" label="item.text"></el-input>
        <!-- 使用文件上传子组件 -->
        <upload-file style="margin-left:15px;"></upload-file>
      </div>
    </div>

    <!-- 多选 -->
    <div v-if="questionForm.type==2">
      <div v-for="item in questionForm.select_options" :key="item.label" class="item">
        <!-- checkbox -->
        <el-checkbox :label="item.label" v-model="questionForm.multiple_select_answer"></el-checkbox>
        <!-- input -->
        <el-input style="margin-left:15px;" v-model="item.text"></el-input>
        <!-- 使用文件上传子组件 -->
        <upload-file style="margin-left:15px;"></upload-file>
      </div>
    </div>

    <!-- 简答 -->
    <div v-if="questionForm.type==3">
      <el-input type="textarea" :rows="6" placeholder="请输入内容" v-model="questionForm.short_answer"></el-input>
    </div>
  </div>
</template>

<script>
// 导入文件上传子组件
import UploadFile from "./upload-file";
export default {
  components: {
    UploadFile
  },
  name: "QuestionType",
  props: ["questionForm"]
};
</script>

<style lang="less">
.questionType {
  .item {
    display: flex;
    align-items: center;
  }
}
</style>