// 快捷访问作用

import variables from '@/styles/common/variables.scss'

// 用法：store.getters.XXX
const getters = {
  // ----- 页面设置相关 -----
  sidebarOpened: (state) => state.viewSettings.sidebarOpened,
  viewTagList: (state) => state.viewSettings.viewTagList,

  // ----- 公共 -----
  captchaKey: (state) => state.common.captchaKey,

  // ----- 用户登录相关 -----
  token: (state) => state.userLogin.token,
  roles: (state) => state.userLogin.roles,
  auths: (state) => state.userLogin.auths,
  hasProfile: (state) => {
    return JSON.stringify(state.userLogin.profile) !== '{}' // true表示用户信息已存在；false表示不存在
  },
  profile: (state) => state.userLogin.profile,

  // ----- 样式 -----
  cssVar: () => variables // 把scss中定义的样式参数导入vuex中方便使用
}

export default getters
