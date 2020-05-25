<template>
  <div class="enterprise">
    <el-dialog center :visible.sync="dialogVisible" title="新增" width="600px">
      <!-- 头部标题 -->
      <span slot="title" class="title">{{mode==='add'?'新增企业':'修改企业'}}</span>
      <!-- 中间内容 -->
      <el-form ref="enterpriseFormRef" :rules="rules" :model="enterpriseForm" label-width="80px">
        <el-form-item prop="eid" label="企业编号">
          <el-input v-model="enterpriseForm.eid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="企业名称">
          <el-input v-model="enterpriseForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="企业简称">
          <el-input v-model="enterpriseForm.short_name"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="企业简介">
          <el-input v-model="enterpriseForm.intro"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="企业备注">
          <el-input v-model="enterpriseForm.remark"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮 -->
      <span slot="footer">
        <el-button @click=" dialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EnterpriseEdit",
  data() {
    return {
      dialogVisible: false, //是否显示
      mode: "", //模式新增还是修改
      // 提交给后台的数据
      enterpriseForm: {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 简称
        intro: "", // 企业简介
        remark: "" // 备注
      },
      // 校验规则
      rules: {
        // 企业编号校验
        eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
        // 企业名称校验
        name: [
          { required: true, message: "企业名称不能为空", trigger: "blur" }
        ],
        // 简称校验
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: "blur" }
        ],
        // 企业简介校验
        intro: [
          { required: true, message: "企业简介不能为空", trigger: "blur" }
        ],
        // 备注校验
        remark: [
          { required: true, message: "企业备注不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 新增或修改点击确认按钮提交的方法
    submit() {
      console.log("-------------");
      this.$refs.enterpriseFormRef.validate(async valid => {
        // 最后校验
        if (!valid) return;
        let res = null;

        //新增或者修改
        if (this.mode === "add") {
          // 新增
          res = await this.$axios.post("/enterprise/add", this.enterpriseForm);
        } else {
          // 修改
          res = await this.$axios.post("/enterprise/edit", this.enterpriseForm);
        }

        // 操作反馈
        if (res.data.code === 200) {
          // 提示
          this.$message({
            type: "success",
            message: this.mode === "add" ? "新增成功~" : "修改成功~"
          });

          // 关闭新增/修改窗口
          this.dialogVisible = false;

          // 调用父组件方法刷新页面
          this.$parent.search();
        }
      });
    }
  }
};
</script>

<style lang="less">
.enterprise {
  .title {
    text-align: center;
    color: #fff;
    background-color: #0e9ff9;
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0px;
    background-color: #0e9ff9;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>