

module.exports={
    chainWebpack:config=>{
        config.plugins.delete("prefetch")
    },

    publicPath: process.env.NODE_ENV === "production" ? "/xzvue-pc/" : "/" ,
}

