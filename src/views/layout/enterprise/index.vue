<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item style="width:150px;" label="企业编号" prop="eid">
          <el-input v-model="searchForm.eid"></el-input>
        </el-form-item>
        <el-form-item style="width:150px;" label="企业名称" prop="name">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item style="width:150px;" label="创建者" prop="username">
          <el-input v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item style="width:150px;" label="启用">
          <el-select v-model="searchForm.status" placeholder="请选择状态" prop="status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-model="searchForm.username" label>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button type @click="clear">清除</el-button>
          <el-button type="primary" @click="add">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表和分页部分 -->
    <el-card>
      <!-- 中间表格部分 -->
      <el-table :data="enterpriseList" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号" width="50"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="200"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status===0?'red':'#87cd67'}"
            >{{scope.row.status===0?"禁用":"启用"}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editEnterprise(scope.row)" type="primary">编辑</el-button>

            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status===0?'success':'info'"
            >{{scope.row.status===0?"启用":"禁用"}}</el-button>

            <el-button @click="del(scope.row.id)" type="primary">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页条部分 -->
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
        ></el-pagination>
      </div>
    </el-card>
    <!-- 使用新增或编辑子组件 -->
    <EnterpriseEdit ref="enterpriseEditRef"></EnterpriseEdit>
  </div>
</template>
<script>
// 导入子组件
import EnterpriseEdit from "./enterprise-add-or-update";
// 完成了第六天的功能
export default {
  // 注册
  components: {
    EnterpriseEdit
  },
  name: "EnterPrise",
  data() {
    return {
      searchForm: {
        eid: "", // 企业编号
        name: "", // 企业名称
        username: "", // 创建者
        status: "" // 状态
      },
      page: 1, // 页码
      limit: 2, // 页容量
      enterpriseList: [], // table展示所需要的数据
      total: 0 // 总条数
    };
  },
  created() {
    // 进入页面渲染企业用户列表
    this.getEnterpriseListData();
  },
  methods: {
    // 获取企业列表
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code == 200) {
        // console.log(res);
        this.enterpriseList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索企业用户
    search() {
      this.page = 1;
      this.getEnterpriseListData();
    },
    // 清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 也容量发生改变
    sizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 当前页码发生改变
    currentChange(val) {
      this.page = val;
      this.getEnterpriseListData();
    },
    // 更改用户状态
    async changeStatus(id) {
      const res = await this.$axios.post("/enterprise/status", { id });
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "更改成功~"
        });
        // 刷新
        this.search();
      }
    },
    // 删除企业用户
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/enterprise/remove", { id });
          if (res.data.code === 200) {
            this.$message({
              type: "success",
              message: "更改成功~"
            });
            // 刷新页面
            this.search();
          }
        })
        .catch(() => {});
    },
    // 新增企业用户
    add() {
      this.$refs.enterpriseEditRef.mode = "add";
      this.$refs.enterpriseEditRef.dialogVisible = true;
      /*
      // 方法一
      // 1.1 resetFields方法同时清空校验和数据
      this.$nextTick(() => {
        this.$refs.enterpriseEditRef.$refs.enterpriseFormRef.resetFields();
      });
      */

      // 方法二
      // 2.1 清空数据模型
      this.$refs.enterpriseEditRef.enterpriseForm = {
        eid: "", // 企业编号
        name: "", // 企业名称
        short_name: "", // 简称
        intro: "", // 企业简介
        remark: "" // 备注
      };
      // // 2.2 清空校验规则
      // this.$nextTick(() => {
      //   this.$refs.enterpriseEditRef.$refs.enterpriseFormRef.clearValidate();
      // });
      // ...以上代码冗余,改为在子组件监听dialogVisible值变化来清空校验
    },
    // 修改企业用户
    editEnterprise(row) {
      // console.log("-----------");
      const { id, eid, name, short_name, intro, remark } = row;
      this.$refs.enterpriseEditRef.enterpriseForm = {
        id,
        eid,
        name,
        short_name,
        intro,
        remark
      };
      this.$refs.enterpriseEditRef.mode = "edit";
      this.$refs.enterpriseEditRef.dialogVisible = true;

      // // 清空校验规则
      // this.$nextTick(() => {
      //   this.$refs.enterpriseEditRef.$refs.enterpriseFormRef.clearValidate();
      // });
      // ...以上代码冗余,改为在子组件监听dialogVisible值变化来清空校验
    }
  }
};
</script>