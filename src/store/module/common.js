// 全局的vuex配置

import { SIDEBAR_OPENED } from '@/constant'
import { getStorageItem } from '@/utils/storage'

export default {
  namespaced: true,

  // 存储状态的变量
  state: {
    sidebarOpened:
      getStorageItem(SIDEBAR_OPENED) == null
        ? true
        : getStorageItem(SIDEBAR_OPENED)
  },

  // （翻译：变化）专注于修改state，理论上是修改state的唯一途径，必须同步执行
  mutations: {},

  // 业务逻辑代码，可以异步，但不能直接操作state，视图触发action，action再触发mutation
  actions: {}
}
