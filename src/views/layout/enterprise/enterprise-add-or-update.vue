<template>
  <div class="enterprise">
    <el-dialog center :visible.sync="dialogVisible" title="新增" width="600px">
      <!-- 头部标题 -->
      <span slot="title" class="title">{{mode==='add'?'新增企业':'修改企业'}}</span>
      <!-- 中间内容 -->
      <el-form label-width="80px">
        <el-form-item label="企业编号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业简称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业简介">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="企业备注">
          <el-input></el-input>
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
      mode: "" //模式新增还是修改
    };
  },
  methods: {
    // 新增或修改点击确认按钮提交的方法
    submit() {}
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