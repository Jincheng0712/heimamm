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
        <el-menu
          :router="true"
          :collapse="isCollapse"
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
        >
          <!--          
          <el-menu-item index="/layout/welcome">
            <i class="el-icon-date"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据预览</span>
          </el-menu-item>
          <el-menu-item index="/layout/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
          -->
          <el-menu-item
            v-for="item in $router.options.routes[2].children"
            :key="item.path"
            :index="item.meta.fullPath"
            v-show="item.meta.roles.includes($store.getters.getUserInfo.role)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
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
      // 默认选中的菜单项
      defaultActive: "/layout/welcome",
      isCollapse: false, // 是否展开左菜单栏
      avatar: "", // 用户的头像
      username: "" // 昵称
    };
  },
  created() {
    this.defaultActive = this.$route.fullPath;
    this.getUserInfoData();
    // console.log(this.$router);
    // $store.getters.getUserInfo.role
    // console.log(this.$store.getters.getUserInfo);
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

        // 保存到仓库中,触发mutations中的方法
        // 参数一setUserInfo:是仓库里mutations中的方法名
        // 参数二res.data.data:是要传给仓库保存起来的数据
        this.$store.commit("setUserInfo", res.data.data);
      }
    },

    // 退出
    logout() {
      this.$confirm("确定退出吗?", "提示", {
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
element.style {
  height: 100%;
}
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

