<template>
  <div class="user">
    <!-- 搜索部分 -->
    <el-card>
      <el-form inline :model="searchForm" ref="searchFormRef" label-width="80px">
        <el-form-item prop="username" label="用户名称">
          <el-input style="width:170px" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input style="width:170px" v-model="searchForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色">
          <el-select style="width:170px" v-model="searchForm.role_id" placeholder="请选择">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search" type="primary">搜索</el-button>
          <el-button @click="clear" type="default">清除</el-button>
          <el-button @click="add" type="primary">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!-- 内容部分:表格 -->
      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0" style="color:red;">禁用</span>
            <span v-if="scope.row.status === 1" style="color:#6ac144;">启用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button type="primary" @click="editUser(scope.row)">编辑</el-button>

            <!-- <el-button
              @click="changeStatus(scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? "启用" : "禁用"}}</el-button>-->

            <!-- 注释的以上代码,改为吊用混入 -->
            <el-button
              @click="changeStatus('/user/status',scope.row.id)"
              :type="scope.row.status === 0 ? 'success' : 'info'"
            >{{scope.row.status === 0 ? "启用" : "禁用"}}</el-button>

            <!-- <el-button @click="deletUser(scope.row.id,scope.row.username)" type="default">删除</el-button> -->
            <!-- 注释以上代码,调用混入的方法来更改状态 -->
            <el-button @click="del('/user/remove',scope.row.id)" type="default">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 内容部分:分页 -->
      <div style="margin-top:15px;text-align:center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 使用子组件 -->
    <userEdit ref="userEditRef" @editok="search" :mode="mode"></userEdit>
  </div>
</template>

<script>
// 导入新增/修改弹窗子组件
import userEdit from "./addOrUpdata";

// 导入写有混入对象的组件
import common from "@/mixins/common";

export default {
  name: "userlist",

  // 进入混入
  mixins: [common],

  // 注册子组件
  components: {
    userEdit
  },
  data() {
    return {
      searchForm: {
        username: "", // 昵称
        email: "", // 邮箱
        role_id: "" // 角色数字 1、超级管理员 2管理员、3老师、 4学生
      },
      page: 1, // 查询时候的页码
      limit: 5, // 查询时候的页容量(每页查询多少条)
      userList: [], // 展示用户列表所需要的数据
      total: 0, // 总条数，分页时候用得着
      mode: "add"
    };
  },
  created() {
    // 获取用户列表数据
    this.getuserList();
  },

  methods: {
    clear() {
      // 获取用户列表数据
      this.$refs.searchFormRef.resetFields();
    },
    search() {
      this.page = 1;
      this.getuserList();
    },
    async getuserList() {
      const res = await this.$axios.get("/user/list", {
        params: {
          page: this.page,
          limit: this.limit,
          // 展开运算符
          ...this.searchForm
        }
      });
      if (res.data.code == 200) {
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      }
    },

    // 每页显示数量发生改变时执行的函数
    handleSizeChange(value) {
      this.limit = value;
      this.search();
    },

    // 当前页数改变时执行的方法
    handleCurrentChange(value) {
      this.page = value;
      this.getuserList();
    },

    //更改用户状态方法
    // async changeStatus(id) {
    //   const res = await this.$axios.post("/user/status", { id });
    //   if (res.data.code === 200) {
    //     this.$message({
    //       message: "用户状态修改成功",
    //       type: "success"
    //     });
    //     // 重新请求数据渲染
    //     this.search();
    //   }
    // },
    // 注释以上代码,调用混入的方法来更改状态

    //删除用户方法
    // deletUser(id, username) {
    //   // 确认框部分
    //   this.$confirm(`确认删除${username}用户吗?`, "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$axios.post("/user/remove", { id });
    //       if (res.data.code === 200) {
    //         this.$message({
    //           message: "用户删除成功",
    //           type: "success"
    //         });
    //         // 重新请求数据渲染
    //         this.search();
    //       }
    //     })
    //     .catch(() => {});
    // },
    // 注释以上代码,调用混入的方法来更改状态

    // 点击弹出新增用户
    add() {
      // 置空表单
      // this.$refs.userEditRef.userForm = {
      //   username: "", //用户名
      //   email: "", // 邮箱
      //   phone: "", //手机号
      //   role_id: "", //角色
      //   status: "", // 状态
      //   remark: "" // 备注
      // };
      this.mode = "add";
      // 清除表单的验证
      this.$next;
      this.$refs.userEditRef.dialogVisible = true;
      // this.$refs.userEditRef.mode = "add";

      // 由于js执行完毕后dom还没有渲染出来,可能导致拿不到
      // 子组件中的表单元素,因此加上一个$nextTick计时器
      this.$nextTick(() => {
        // this.$refs.userEditRef.$refs.userEditFormRef.clearValidate();

        // 方法二:resetFields将表单内容和校验同时置空
        this.$refs.userEditRef.$refs.userEditFormRef.resetFields();
      });
    },
    //修改用户
    editUser(row) {
      // console.log(row);
      this.mode = "edit";
      this.$refs.userEditRef.dialogVisible = true;

      // 注意:由于浅拷贝指向的是同一地址,直接复制会导致没有提交
      //      也会直接修改了数据,因此给userForm赋值需要深拷贝,才不破坏原先的数据
      // this.$refs.userEditRef.userForm = row; //不能直接赋值
      // 方法一:可以利用展开运算符
      // this.$refs.userEditRef.userForm = { ...row };
      // 方法二:JSON.parse(JSON.stringify());深拷贝
      this.$refs.userEditRef.userForm = JSON.parse(JSON.stringify(row));

      // 清除校验 需要拿到dom所以也需要使用$nextTick计时器
      this.$nextTick(() => {
        this.$refs.userEditRef.$refs.userEditFormRef.clearValidate();
      });
    }
  }
};
</script> 