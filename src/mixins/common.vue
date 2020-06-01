<script>
export default {
  // 封装可复用的方法
  methods: {
    // 更改状态公共方法
    async changeStatus(url, id) {
      const res = await this.$axios.post(url, { id });
      if (res.data.code === 200) {
        this.$message({
          message: "状态修改成功",
          type: "success"
        });
        // 重新请求数据渲染
        this.search();
      }
    },

    // 删除公共方法
    del(url, id) {
      // 确认框部分
      this.$confirm(`确认删除数据吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$axios.post(url, { id });
          if (res.data.code === 200) {
            this.$message({
              message: "用户删除成功",
              type: "success"
            });
            // 重新请求数据渲染
            this.search();
          }
        })
        .catch(() => {});
    }
  }
};
</script>