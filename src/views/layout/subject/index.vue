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
    <el-card style="margin-top:15px;"></el-card>
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
    search() {
      this.page = 1;
      this.getSubjectListData();
    },
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    }
  }
};
</script>