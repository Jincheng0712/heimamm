<template>
  <div class="questionEdit">
    <el-dialog fullscreen :visible.sync="dialogVisible">
      <!-- 头部标题 -->
      <div slot="title" class="title">{{mode==="add"?"新增试题":"修改试题"}}</div>

      <!-- 中间部分 -->
      <el-form
        class="form"
        label-width="120px"
        label-position="left"
        :model="questionForm"
        ref="questionFormRef"
        :rules="rules"
      >
        <el-form-item label="学科" prop="subject">
          <el-select class="selectWidth" v-model="questionForm.subject" placeholder="请选择学科">
            <el-option
              v-for="item in subjectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="阶段" prop="step">
          <el-select class="selectWidth" v-model="questionForm.step" placeholder="请选择阶段">
            <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="企业" prop="enterprise">
          <el-select class="selectWidth" v-model="questionForm.enterprise" placeholder="请选择阶段">
            <el-option
              v-for="item in enterpriseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="city">
          <el-cascader
            :props="{value:'label'}"
            size="large"
            :options="options"
            v-model="questionForm.city"
          ></el-cascader>
        </el-form-item>

        <el-form-item label="题型" prop="type">
          <el-radio-group v-model="questionForm.type">
            <el-radio v-for="(value,name) in typeObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="难度" prop="difficulty">
          <el-radio-group v-model="questionForm.difficulty">
            <el-radio v-for="(value,name) in difficultyObj" :key="name" :label="name">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button>取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
// 导入中国地区三级联动
import { regionData } from "element-china-area-data";
export default {
  name: "QuestionEdit",
  // 子组件接收
  props: {
    subjectList: Array,
    enterpriseList: Array,
    stepObj: Object,
    typeObj: Object,
    difficultyObj: Object
  },

  data() {
    return {
      mode: "", // add 新增 edit 修改
      dialogVisible: false, // 控制dialog的显示及隐藏
      options: regionData, //地区三级联动数据

      // 要传递给服务器的数据模型
      questionForm: {
        subject: "", //学科
        step: "", // 阶段
        enterprise: "", // 企业
        type: "1", //题型
        difficulty: "2", // 难度
        city: [] // 城市
      },

      // 校验规则
      rules: {
        subject: [{ required: true, message: "请选择学科", trigger: "change" }],
        step: [{ required: true, message: "请选择阶段", trigger: "change" }],
        enterprise: [
          { required: true, message: "请选择企业", trigger: "change" }
        ],
        type: [{ required: true, message: "请选择题型", trigger: "change" }],
        difficulty: [
          { required: true, message: "请选择题型", trigger: "change" }
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }]
      }
    };
  }
};
</script>


<style lang="less">
.questionEdit {
  .title {
    color: #fff;
    padding-left: 15px;
    height: 54px;
    line-height: 54px;
    background-color: #04bcfa;
  }
  .el-dialog__header {
    padding: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 832px;
    margin: 0 auto;
  }
  .selectWidth {
    width: 300px;
  }
}
</style>