//vue脚手架项目 -默认配置文件名
//webpack+node环境 导出配置对象
module.exports = {
    devServer: {
        port: 8080,
        open: true //浏览器自动打开

    },
    lintOnSave: false, //关闭eslint检查,
    pages: {
        index: {
            //入口
            entry: "src/main.js",
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://toutiao.itheima.net/',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true
            }
        }
    }
}