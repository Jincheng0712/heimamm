module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 按需导入element UI
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
