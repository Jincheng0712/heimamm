<template>
  <div>
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item prop="rid" label="学科编号">
          <el-input style="width:180px;" v-model="searchForm.rid"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科姓名">
          <el-input style="width:180px;" v-model="searchForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="创建者">
          <el-input style="width:180px;" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表、分页部分 -->
    <el-card style="margin-top:15px;">
      <!-- 列表部分 -->
      <el-table align="center" :data="subjectList" border stripe>
        <el-table-column align="center" type="index" width="50"></el-table-column>
        <el-table-column align="center" label="学科编号" prop="rid" width="200px"></el-table-column>
        <el-table-column align="center" label="学科名称" prop="name" width="200px"></el-table-column>
        <el-table-column align="center" label="简称" prop="short_name" width="200px"></el-table-column>
        <el-table-column align="center" label="创建者" prop="username" width="200px"></el-table-column>
        <el-table-column align="center" label="创建日期" prop="create_time" width="200px"></el-table-column>
        <el-table-column align="center" label="状态" width="200px">
          <template slot-scope="scope">
            <span
              :style="{color:scope.row.status===1?'#6ac144':'red'}"
            >{{scope.row.status===1?"启用":"禁用"}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary">编辑</el-button>

            <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status===1?'info':'success'"
            >{{scope.row.status===1?"禁用":"启用"}}</el-button>

            <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Subject",
  data() {
    return {
      searchForm: {
        rid: "", // 学科编号
        name: "", // 学科姓名
        username: "", // 创建者
        status: "" // 状态
      },
      page: 1, // 页码
      limit: 2, // 页容量
      subjectList: [], // 学科列表数据
      total: 0 // 总条数
    };
  },
  created() {
    this.getSubjectListData();
  },
  methods: {
    // 获取学科列表数据
    async getSubjectListData() {
      let res = await this.$axios.get("/subject/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });

      if (res.data.code === 200) {
        this.subjectList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getSubjectListData();
    },
    // 清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },
    // 页容量发生改变回调函数
    handleSizeChange(val) {
      this.limit = val;
      this.search();
    },
    // 当前页码发生改变回调函数
    handleCurrentChange(val) {
      this.page = val;
      this.getSubjectListData();
    },
    // 更改状态
    async changeStatus(id) {
      // console.log("132", id);
      const res = await this.$axios.post("/subject/status", { id });
      if (res.data.code == 200) {
        // 提示
        this.$message({
          type: "success",
          message: "更新状态成功~"
        });
        // 刷新
        this.getSubjectListData();
      }
    },
    // 删除操作
    del(id) {
      this.$confirm("确认要删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/subject/remove", { id });
          if (res.data.code == 200) {
            // 提示
            this.$message({
              type: "success",
              message: "删除成功~"
            });
            // 刷新
            this.getSubjectListData();
          }
        })
        .catch(() => {});
    }
  }
};
</script>