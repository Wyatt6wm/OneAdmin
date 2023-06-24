import { createStore } from 'vuex'
import getters from './getters'
import viewSettings from './modules/view_settings'
import common from './modules/common'
import userLogin from './modules/user_login'

export default createStore({
  // 注册getters方便调用
  getters,
  // 注册所有模块
  modules: {
    viewSettings,
    common,
    userLogin
  }
})
