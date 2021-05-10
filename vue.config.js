module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },

  publicPath: process.env.NODE_ENV === "production" ? "/xzvue-pc/" : "/",

   /* 输出文件目录：在npm run build时，生成文件的目录名称 */
   outputDir: 'dist',
   /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
   assetsDir: "assets",

   /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
   // map文件的作用：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   // 有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   productionSourceMap: true,

   /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
   filenameHashing: true,  
  

  devServer: {
    port: 8080,
    open: true, //配置自动启动浏览器

    proxy: {
      "/api": {
        target: "http://115.159.160.93:8080",
        changeOrigin: false,
        pathRewrite: {
          "/api": "",
        },
      },
      
    },
    
  },
};
