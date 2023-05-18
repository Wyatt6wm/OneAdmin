// 快捷访问作用

import variables from '@/styles/common/variables.scss'

// 用法：store.getters.XXX
const getters = {
  token: (state) => state.common.token,
  hasProfile: (state) => {
    return JSON.stringify(state.common.profile) !== '{}' // true表示用户信息已存在；false表示不存在
  },
  profile: (state) => state.common.profile,
  sidebarOpened: (state) => state.common.sidebarOpened,
  cssVar: () => variables // 把scss中定义的样式参数导入vuex中方便使用
}

export default getters
