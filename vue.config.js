module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },

  publicPath: process.env.NODE_ENV === "production" ? "/xzvue-pc/" : "/",

  productionSourceMap: true,
  // 把这个改为false。不然在最终打包的文件中会出现一些map文件
  // map文件的作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。

  devServer: {
    port: 8080,
    

    proxy: {
      "/api": {
        target: "http://115.159.160.93:8080",
        changeOrigin: false,
        pathRewrite: {
          "/api": "",
        },
      },
      "/foo": {
        target: "<other_url>",
      },
    },
    //https: true,
    // https: {
    //   key: fs.readFileSync("/path/to/server.key"),
    //   cert: fs.readFileSync("/path/to/server.crt"),
    //   ca: fs.readFileSync("/path/to/ca.pem"),
    // },
  },
};
