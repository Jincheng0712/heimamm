<template>
  <div>
    <!-- 搜索区域 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="searchForm.subject" placeholder="请选择学科">
                <el-option
                  v-for="item in subjectList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="searchForm.enterprise" placeholder="请选择企业">
                <el-option
                  v-for="item in enterpriseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="searchForm.step" placeholder="请选择阶段">
                <el-option v-for="(value,name) in stepObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select v-model="searchForm.type" placeholder="请选择题型">
                <el-option v-for="(value,name) in typeObj" :key="name" :label="value" :value="name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="searchForm.difficulty" placeholder="请选择难度">
                <el-option
                  v-for="(value,name) in difficultyObj"
                  :key="name"
                  :label="value"
                  :value="name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchForm.status" placeholder="请选择状态">
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker v-model="searchForm.create_date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input style="width:300px" v-model="searchForm.title"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item>
              <el-button @click="search" type="primary">搜索</el-button>
              <el-button @click="clear">清除</el-button>
              <el-button @click="add" type="primary">+新增试题</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 列表区域 -->
    <el-card style="margin-top:15px;">
      <el-table :data="questionList" border stripe>
        <el-table-column label="序号" type="index"></el-table-column>

        <el-table-column label="题目">
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>

        <!-- 学科与阶段 -->
        <el-table-column label="学科.阶段" :formatter="formatterSubject"></el-table-column>

        <el-table-column label="题型" :formatter="formatterType">
          <!-- <template slot-scope="scope"> -->
          <!-- <span> -->
          <!-- 方法一:直接写简单高效 -->
          <!-- {{typeObj[scope.row.type]}} -->
          <!-- 方法二:自定义方法返回 -->
          <!-- {{formatType(scope.row.type)}} -->
          <!-- </span> -->
          <!-- </template> -->
        </el-table-column>

        <el-table-column label="企业" prop="enterprise_name"></el-table-column>

        <el-table-column label="创建者" prop="username"></el-table-column>

        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <div
              :style="{color:scope.row.status==1?'#6ac144':'red'}"
            >{{scope.row.status=="1"?"启用":"禁用"}}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="editSubject(scope.row)">编辑</el-button>
            <el-button
              :type="scope.row.status==1?'info':'success'"
              @click="changeStatus(scope.row.id)"
            >{{scope.row.status=="1"?"禁用":"启用"}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
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
    <!-- 使用子组件 -->
    <!-- 父组件传值 -->
    <question-edit
      ref="questionEditRef"
      :subjectList="subjectList"
      :enterpriseList="enterpriseList"
      :stepObj="stepObj"
      :typeObj="typeObj"
      :difficultyObj="difficultyObj"
    ></question-edit>
  </div>
</template>

<script>
// 导入子组件
import QuestionEdit from "./question-add-or-update";
export default {
  name: "Question",
  components: {
    QuestionEdit
  },
  data() {
    return {
      subjectList: [], //学科列表
      enterpriseList: [], //企业列表
      stepObj: { 1: "初级", 2: "中级", 3: "高级" }, //阶段
      typeObj: { 1: "单选", 2: "多选", 3: "简答" }, //题型
      difficultyObj: { 1: "简单", 2: "一般", 3: "困难" }, //难度

      // 搜索时要传递给后台的数据模型
      searchForm: {
        subject: "", // 学科
        enterprise: "", // 企业
        step: "", // 阶段
        type: "", // 题型
        difficulty: "", // 难度
        username: "", // 作者
        status: "", // 状态 0 禁用 1 启用
        create_date: "", // 创建日期
        title: "" // 标题
      },
      page: 1, //页码
      limit: 2, //页容量
      questionList: [], // 题库列表
      total: 0 // 总条数
    };
  },
  created() {
    this.getSubjectListData();
    this.getEnterpriseListData();
    this.getQuestionListData();
  },

  methods: {
    // 获取 学科列表
    async getSubjectListData() {
      const res = await this.$axios.get("/subject/list");
      if (res.data.code === 200) {
        this.subjectList = res.data.data.items;
      }
    },
    // 获取 企业列表
    async getEnterpriseListData() {
      const res = await this.$axios.get("/enterprise/list");
      if (res.data.code === 200) {
        this.enterpriseList = res.data.data.items;
      }
    },

    // 分页获取 题库列表 数据
    async getQuestionListData() {
      const res = await this.$axios.get("/question/list", {
        params: {
          page: this.page,
          limit: this.limit,
          ...this.searchForm
        }
      });
      if (res.data.code === 200) {
        this.questionList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },
    // 搜索
    search() {
      this.page = 1;
      this.getQuestionListData();
    },
    // 清除
    clear() {
      this.$refs.searchFormRef.resetFields();
      this.search();
    },

    add() {
      this.$refs.questionEditRef.mode = "add";
      this.$refs.questionEditRef.dialogVisible = true;
    },

    // 编辑
    editSubject() {},

    // 更改状态
    async changeStatus(id) {
      const res = await this.$axios.post("/question/status", { id });
      if (res.data.code === 200) {
        // 提示
        this.$message({
          type: "success",
          message: "更改状态成功~"
        });
        // 刷新当前页面
        this.getQuestionListData();
      }
    },
    //删除
    del(id) {
      // 弹窗确认
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post("/question/remove", { id });
          if (res.data.code === 200) {
            // 提示
            this.$message({
              type: "success",
              message: "删除成功~"
            });
            // 刷新当前页面
            this.search();
          }
        })
        .catch(() => {});
    },

    // // 自定义方法
    // formatType(val) {
    //   return this.typeObj[val];
    // }

    //  饿了么UI的formatter方法格式化题型
    formatterType(row) {
      return this.typeObj[row.type];
    },

    //  饿了么UI的formatter方法格式化学科与阶段
    formatterSubject(row) {
      return `${row.subject_name}-${this.typeObj[row.step]}`;
    },

    //页容量发生改变
    sizeChange(val) {
      this.limit = val;
      this.search();
    },
    //当前页发生改变
    currentChange(val) {
      this.page = val;
      this.getQuestionListData();
    }
  }
};
</script>