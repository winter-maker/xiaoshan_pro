const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    port: 8082,
    proxy: {
      "^/api": {
        target: "http://localhost:8888",
        //ws: true,
        changOrigin: true,
      },
      "/v1.0": {
        target: "https://api.dingtalk.com",
        changOrigin: true,
      },
    },
  },
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  configureWebpack: {
    // 打包忽略文件
    externals: {
      tianditu: "tianditu",
    },
  },
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"],
      cdn: {
        css: [],
        js: [
          "https://api.map.baidu.com/api?v=1.0&type=webgl&ak=zOny7QHaU3erFS3WYWAFK0fgHrf8Qhdr",
          // "http://api.tianditu.gov.cn/api?v=4.0&tk=9a253e27974ed47538a454861833f262",
        ],
      },
    },
  },
});
