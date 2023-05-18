// 路径解析的标准步骤
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

// https://cli.vuejs.org/zh/guide/webpack.html#简单的配置方式
module.exports = {
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
