module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {     //axios跨域处理
            '/api': {       //此处并非和url一致
                target:'http://101.37.84.109/',
                changeOrigin:true, //允许跨域
                pathRewrite:{
                    '^/api': ''
                }
            }
        },
    }

}
