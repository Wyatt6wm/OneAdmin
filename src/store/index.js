import { createStore } from 'vuex'
import getters from './getters'
import common from './module/common'

export default createStore({
  // 注册getters方便调用
  getters,
  // 注册所有模块
  modules: {
    common
  }
})
