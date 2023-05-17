// 1、把src/assets/icons/svg里面的.svg图标文件全部导入；对这些图标注册为全局组件
// 2、把element-plus-icons-vue里面的图标注册为全局组件

import SvgIcon from '@/components/SvgIcon'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 导入所有的本地SVG图标文件
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
const svgRequire = require.context('@/assets/icons/svg', false, /\.svg$/)
// 此时返回一个require的函数（即svgRequire），可以接受一个request的参数，用于require的导入。
// 该函数提供了三个属性，可以通过require.keys()获取到所有的SVG图标
// 遍历图标，把图标作为request传入到require导入函数中，完成本地SVG图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

// 这个函数接收app实例作为参数
export default (app) => {
  // 1、SvgIcon component的全局注册（跟上面的导入SVG文件的代码没关系）
  app.component('svg-icon', SvgIcon) // (组件名, 组件)
  // 2、全局注册ElementPlus提供的图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
