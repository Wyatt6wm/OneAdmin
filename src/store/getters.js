// 快捷访问作用

import variables from '@/styles/common/variables.scss'

// 用法：store.getters.XXX
const getters = {
  sidebarOpened: (state) => state.common.sidebarOpened,
  cssVar: (state) => variables // 把scss中定义的样式参数导入vuex中方便使用
}

export default getters
