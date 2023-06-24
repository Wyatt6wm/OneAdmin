// 路径解析的标准步骤
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
module.exports = {
  // webpack提供了devServer代理功能，可以把所有请求到当前服务中的请求，转发到另外的服务器上。详见：https://www.webpackjs.com/configuration/dev-server/
  devServer: {
    proxy: {
      // 当地址中有/api的时候会触发代理机制，转发到目标服务器。这时候对/api/login的请求会转发成：目标主机/api/login
      '/api': {
        // 本地连接本地后端
        target: 'http://localhost:8000/',
        // 本地连接云服务器后端
        // target: 'http://admin.wyatt.run:8000',
        // 本地连接本地后端 / 生产运行
        // target: 'http://oneplatform-gateway:8000/',
        changeOrigin: true // 允许跨域
      }
    }
  },
  chainWebpack(config) {
    // 设置svg-sprite-loader（解决项目自定义图标不显示的问题）
    // config为webpack配置对象
    // config.module表示创建一个具名规则，以后用来修改规则
    config.module
      // 规则
      .rule('svg')
      // 忽略
      .exclude.add(resolve('src/assets/icons'))
      // 结束
      .end()
    config.module
      // 规则
      .rule('icons')
      // 正则，解析.svg格式文件
      .test(/\.svg$/)
      // 解析的文件
      .include.add(resolve('src/assets/icons'))
      // 结束
      .end()
      // 新增了一个解析的loader
      .use('svg-sprite-loader')
      // 具体的loader
      .loader('svg-sprite-loader')
      // loader的配置
      .options({
        symbolId: 'icon-[name]'
      })
      // 结束
      .end()
  }
}
