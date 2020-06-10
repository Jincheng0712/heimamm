<template>
  <div class="uploadFile">
    <!-- 
    action属性是文件上传的URL
    name是后台接受的字段名,必须有
    on-success上传成功之后的回调
    before-upload上传之前的回调
    -->
    <el-upload
      class="avatar-uploader"
      :action="BASE_URL+'/question/upload'"
      name="file"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <div v-if="type==='video'">
        <video v-if="value" :src="BASE_URL+'/'+value" controls class="avatar"></video>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <div v-else>
        <img v-if="value" :src="BASE_URL+'/'+value" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    // 这个type表示父组件question-add-or-update中传过来的文件类型
    type: {
      type: String, // 这里表示 type 类型是字符串
      default: "image" //默认是image
    },
    value: String
  },
  data() {
    return {
      // 基准路径 http://127.0.0.1/heimamm/public
      BASE_URL: process.env.VUE_APP_BASEURL
    };
  },
  methods: {
    // 上传成功后的回调
    handleAvatarSuccess(res) {
      // res.data.url => 需要把路径赋值给父组件中questionForm的video
      this.$emit("input", res.data.url);
    },
    // 上传之前的回调
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        //上传视频
        const isVideo = file.type === "video/mp4";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isVideo) {
          this.$message.error("上传视频只能是 MP4 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传视频大小不能超过 2MB!");
        }
        return isVideo && isLt2M;
      } else {
        //上传图片
        const isImage =
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/gif";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImage) {
          this.$message.error("上传图片只能是 png/jpeg/gif 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isImage && isLt2M;
      }
    }
  }
};
</script>


<style lang="less">
.uploadFile {
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
}
</style>
