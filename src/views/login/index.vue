<template>
  <div class="login-container">
    <div class="left">
      <div class="title-box">
        <img src="@/assets/login_icon.png" alt />
        <span class="title">黑马面面</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- form表单部分 -->
      <el-form :model="loginFrom" :rules="rules" ref="loginFormRef" class="login-form">
        <!-- 手机号码 -->
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="loginFrom.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginFrom.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row :gutter="18">
            <el-col :span="16">
              <el-input v-model="loginFrom.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="getCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item prop="isCheck">
          <el-checkbox v-model="loginFrom.isCheck"></el-checkbox>我已阅读并同意
          <el-link type="primary" href="http://www.baidu.com">用户协议</el-link>和
          <el-link type="primary" href="http://www.baidu.com">隐私条款</el-link>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="loginClick" style="width:100%" type="primary">登录</el-button>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button @click="register" style="width:100%" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_bg.png" alt />
    </div>
    <!-- 引用注册弹框子组件 -->
    <register ref="registerRef"></register>
  </div>
</template>

<script>
//导入register注册弹框子组件
import register from "./register";

// 按需导入token.js里面的方法
import { setToken } from "@/utils/token";

export default {
  name: "login",
  // 注册子组件
  components: {
    register
  },
  data() {
    return {
      isShow: "",
      // 验证码请求地址
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      loginFrom: {
        phone: "18511111111", // 手机号
        password: "12345678", // 密码
        code: "", // 验证码
        isCheck: true // 用户协议
      },

      // 校验规则对象
      rules: {
        // 手机校验规则
        phone: [
          // 默认校验规则
          //{ required: true, message: "请输入活动名称", trigger: "blur" },
          //{ min: 11, max: 11, message: "长度在 11 个字符", trigger: "blur" }

          // 也可以自定义校验规则
          {
            validator: (rule, value, callback) => {
              // console.log("这个值是"+value);
              if (!value) {
                // 注意:这里的return不是返回值的作用
                // 而是起打断代码执行作用,
                callback(new Error("手机号不能为..为..为空"));
                return;
              }
              // 手机号的正则表达式
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                // 注意:这里的return不是返回值的作用
                // 而是起打断代码执行作用,
                callback(new Error("手机号不合法"));
                return;
              }
              // 校验通过后调用callback方法
              callback();
            },
            // 触发方式
            trigger: "blur"
          }
        ],
        // 密码校验规则
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6-12 个字符", trigger: "blur" }
        ],
        // 验证码校验规则
        code: [
          { required: true, message: "必须输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        // 勾选用户协议校验
        isCheck: [
          {
            validator: (rule, value, callback) => {
              // console.log("这个值是"+value);
              if (!value) {
                callback(new Error("必须勾选用户协议"));
                return; //阻止代码继续执行
              }
              // 校验通过后调用的方法
              callback();
            },
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    // 点击刷新验证码
    getCode() {
      // console.log("执行了getCode---"); //打印测试

      // codeURL如果这样不会重新发送请求,原因是浏览器有缓存,
      // 认为请求的路径完全一致,便不会再次发送,
      // this.codeURL = process.env.VUE_APP_BASEURL+ "/captcha?type=login";

      // 解决=>路径后面在拼接一个随机参数
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&sb=" + Math.random();

      // console.log("this.codeURL"); //打印测试
    },

    // 登录
    loginClick() {
      this.$refs.loginFormRef.validate(async valid => {
        // 如果校验不通过,直接打断代码执行
        if (!valid) return;
        // 发请求登录
        /**
        this.$axios.post("/login", this.loginFrom).then(res => {
          // console.log(res.data);
          if (res.data.code == 200) {
            this.$message({
              message: "登陆成功",
              type: "success"
            });
          } else {
            this.$message.error(res.data.message);
            // 失败后刷新验证码
            this.codeURL = process.env.VUE_APP_BASEURL +"/captcha?type=login&sb="+Math.random();
          }
        });
         */

        // 把以上注释代码
        const res = await this.$axios.post("/login", this.loginFrom);
        if (res.data.code == 200) {
          this.$message({
            message: "登陆成功",
            type: "success"
          });
          // 保存token
          setToken(res.data.data.token);
          // 跳转到后台页面
          this.$router.push("/layout");
        } else {
          this.$message.error(res.data.message);
          // 失败后刷新验证码
          this.codeURL =
            process.env.VUE_APP_BASEURL +
            "/captcha?type=login&sb=" +
            Math.random();
        }
      });
    },
    // 注册 点击注册按钮弹出register页面
    register() {
      this.$refs.registerRef.dialogVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  // height: 800px;
  padding: 10% 0;

  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    background: #f5f5f5;
    padding: 48px;
    .title-box {
      display: flex;
      align-items: center;
      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #c7c7c7;
        height: 27px;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    .login-form {
      margin-top: 29px;
      .captcha {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
