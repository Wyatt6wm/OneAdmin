// 快捷访问作用

import variables from '@/styles/common/variables.scss'

// 用法：store.getters.XXX
const getters = {
  // ----- 页面设置相关 -----
  sidebarOpened: (state) => state.ViewSettings.sidebarOpened,
  viewTagList: (state) => state.ViewSettings.viewTagList,

  // ----- 公共 -----
  captchaKey: (state) => state.Common.captchaKey,

  // ----- 用户登录相关 -----
  token: (state) => state.UserLogin.token,
  hasProfile: (state) => {
    return JSON.stringify(state.UserLogin.profile) !== '{}' // true表示用户信息已存在；false表示不存在
  },
  profile: (state) => state.UserLogin.profile,

  // ----- 样式 -----
  cssVar: () => variables // 把scss中定义的样式参数导入vuex中方便使用
}

export default getters
