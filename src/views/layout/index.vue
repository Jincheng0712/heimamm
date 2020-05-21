<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i @click="isCollapse=!isCollapse" style="font-size: 20px;" class="el-icon-s-fold"></i>
        <img src="@/assets/layout_icon.png" class="marginlr" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{ username }} 欢迎您</span>
        <el-button @click="logout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!--左边菜单  -->
      <el-aside width="auto">
        <el-menu :router="true" :collapse="isCollapse" default-active="layout/enterprise">
          <el-menu-item index="chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 后台导航菜单对象的内容组件路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { removeToken } from "@/utils/token";

export default {
  data() {
    return {
      isCollapse: false, // 是否展开左菜单栏
      avatar: "", // 用户的头像
      username: "" // 昵称
    };
  },
  created() {
    this.getUserInfoData();
  },
  methods: {
    async getUserInfoData() {
      const res = await this.$axios.get("/info", {
        // headers: {
        //   token: getToken()
        // }
        // 以上代码 在request.js中全局配置设置请求头的token
      });

      if (res.data.code === 200) {
        this.avatar = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
        this.username = res.data.data.username;
      }
    },

    // 退出
    // logout() {
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$axios.get("/logout");
    //       if (res.data.code == 200) {
    //         // 1.删除token
    //         removeToken();
    //         // 2.跳转到首页
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }

    // 退出
    logout() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.get("/logout");
          if (res.data.code == 200) {
            // 删除token
            removeToken();
            // 跳转到登录页面
            this.$router.push("/login");
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less">
// .layout {
//   .header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 1px solid #f3f3f3;
//     .left {
//       display: flex;
//       align-items: center;
//       .marginlr {
//         margin-left: 10px;
//         margin-right: 10px;
//       }
//       .title {
//         font-size: 22px;
//         color: #49a1ff;
//         background-color: #fff;
//       }
//     }
//     .right {
//       display: flex;
//       align-items: center;
//       img {
//         width: 43px;
//         height: 43px;
//         margin-right: 9px;
//         border-radius: 50%;
//       }
//       .name {
//         margin-right: 38px;
//       }
//     }
//   }

//   .el-main {
//     background-color: #e6e6e5;
//   }

//   .el-container {
//     height: 800px;
//   }
// }
</style>
<style lang="less">
.layout {
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f3f3f3;
    .left {
      display: flex;
      align-items: center;
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
        background-color: #fff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-main {
    background-color: #a7abb7;
  }
  .el-menu {
    border-right: solid 0px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
    background-color: #fff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>

