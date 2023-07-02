// 快捷访问作用

import variables from '@/styles/common/variables.scss'

// 用法：store.getters.XXX
const getters = {
  // ----- 页面设置相关 -----
  sidebarOpened: (state) => state.viewSettings.sidebarOpened,
  viewTagList: (state) => state.viewSettings.viewTagList,

  // ----- 公共 -----
  captchaKey: (state) => state.common.captchaKey,
  routesPrepared: (state) => state.common.routesPrepared,

  // ----- 用户登录相关 -----
  token: (state) => state.userLogin.token,
  hasRoles: (state) => state.userLogin.hasRoles,
  roles: (state) => state.userLogin.roles,
  hasAuths: (state) => state.userLogin.hasAuths,
  auths: (state) => state.userLogin.auths,
  hasProfile: (state) => state.userLogin.hasProfile,
  gettingProfile: (state) => state.userLogin.gettingProfile,
  profile: (state) => state.userLogin.profile,

  // ----- 样式 -----
  cssVar: () => variables // 把scss中定义的样式参数导入vuex中方便使用
}

export default getters
