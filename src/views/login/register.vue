<template>
  <div class="regester">
    <el-dialog center :visible.sync="dialogVisible" width="600px">
      <!-- title插槽  -->
      <div slot="title" class="title">用户注册</div>

      <!-- body部分 -->
      <!-- <span>测试dialog</span> -->
      <el-form ref="regesterFormRef" :rules="rules" :model="regesterFrom" label-width="100px">
        <!-- 头像上传 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            name="image"
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="username">
          <el-input v-model="regesterFrom.username"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="regesterFrom.email"></el-input>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input v-model="regesterFrom.phone"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="regesterFrom.password"></el-input>
        </el-form-item>

        <el-form-item label="图形码" prop="code">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="regesterFrom.code"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" :src="codeURL" @click="changecodeURL" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="验证码" prop="rcode">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model.number="regesterFrom.rcode"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button @click="getRcode">获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>

      <!-- footer插槽  -->
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "regester",
  // props: ["isShow"],
  data() {
    return {
      // 图形码
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",

      // 头像的URL
      imageUrl: "",
      // 头像上传地址
      uploadAction: process.env.VUE_APP_BASEURL + "/uploads",

      dialogVisible: false,
      // 用户注册from表单
      regesterFrom: {
        username: "", // 昵称
        phone: "", // 手机号
        email: "", // 邮箱
        avatar: "", // 头像
        password: "", // 密码
        code: "", // 图形码
        rcode: "" // 验证码
      },
      // 校验规则模型
      rules: {
        // 头像校验
        avatar: [{ required: true, message: "不能为空", trigger: "blur" }],

        // 昵称校验
        username: [{ required: true, message: "不能为空", trigger: "blur" }],

        // 邮箱校验
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("邮箱不能为空"));
                return;
              }
              // 邮箱正则
              const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
              if (!reg.test(value)) {
                callback(new Error("邮箱不合法"));
                return;
              }
              callback();
            },
            trigger: "blur"
          }
        ],

        // 手机号校验
        phone: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("嘿嘿,不能空"));
                return;
              }
              // 手机正则
              const reg = /^1[3456789][0-9]{9}$/;
              if (!reg.test(value)) {
                callback(new Error("手机号不合法"));
                return;
              }
              callback();
            },
            trigger: "blur"
          }
        ],

        // 密码校验
        password: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 6, message: "密码必须6位数或者以上", trigger: "blur" }
        ],
        // 图形码校验
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
        // 验证码校验
        rcode: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("不能为空"));
                return;
              }
              if (!Number.isInteger(value)) {
                callback(new Error("必须是数字"));
                return;
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 刷新验证码方法
    changecodeURL() {
      this.codeURL =
        process.env.VUE_APP_BASEURL +
        "/captcha?type=sendsms&r=" +
        Math.random();
    },

    // 获取验证码方法
    async getRcode() {
      /** 
      this.$axios
        .post("/sendsms", {
          code: this.regesterFrom.code,
          phone: this.regesterFrom.phone
        })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res);
            this.regesterFrom.rcode = res.data.data.captcha;
          } else {
            this.$message.error(res.data.message);
            this.changecodeURL();
          }
        });
        */
      const res = await this.$axios.post("/sendsms", {
        code: this.regesterFrom.code,
        phone: this.regesterFrom.phone
      });

      if (res.data.code == 200) {
        console.log(res);
        this.regesterFrom.rcode = res.data.data.captcha;
      } else {
        this.$message.error(res.data.message);
        this.changecodeURL();
      }
    },

    // 头像上传之前回调函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 头像上传成功回调函数
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = process.env.VUE_APP_BASEURL + "/" + res.data.file_path;
      this.regesterFrom.avatar = res.data.file_path;
    },
    // 确认注册
    submit() {
      this.$refs.regesterFormRef.validate(async valid => {
        if (!valid) return;
        const res = await this.$axios.post("/register", this.regesterFrom);
        if (res.data.code == 200) {
          // 提示注册成功
          this.$message({
            message: "恭喜你，注册成功",
            type: "success"
          });
          // 关闭当前窗口
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.captcha {
  width: 100%;
  height: 40px;
}
.title {
  height: 53px;
  background-color: #03c0f9;
  color: #fff;
  text-align: center;
  line-height: 53px;
}

.el-dialog__header {
  padding: 0px;
}
.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>