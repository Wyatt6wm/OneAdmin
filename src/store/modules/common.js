// 全局的vuex配置

import { SIDEBAR_OPENED, TOKEN } from '@/constant'
import {
  getStorageItem,
  setStorageItem,
  removeAllStorageItem
} from '@/utils/storage'
import api from '@/api'
import md5 from 'md5'
import { setTokenTimestamp } from '@/utils/token'
import router from '@/router'

export default {
  namespaced: true,

  // 存储状态的变量
  state: {
    token: getStorageItem(TOKEN) || '', // 先从LocalStorage获取token，没有时再赋默认值空
    profile: {},
    sidebarOpened:
      getStorageItem(SIDEBAR_OPENED) == null
        ? true
        : getStorageItem(SIDEBAR_OPENED)
  },

  // （翻译：变化）专注于修改state，理论上是修改state的唯一途径，必须同步执行
  mutations: {
    // 存储token
    setToken(state, token) {
      state.token = token // 存到vuex中，其他地方使用
      setStorageItem(TOKEN, token) // 存到LocalStorage中用来自动登录
    },
    // 存储个人信息
    setProfile(state, profile) {
      state.profile = profile
    },
    // 切换菜单栏伸缩状态
    changeSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
      setStorageItem(SIDEBAR_OPENED, state.sidebarOpened)
    }
  },

  // 业务逻辑代码，可以异步，但不能直接操作state，视图dispatch触发action，action再commit触发mutation
  actions: {
    /**
     * 切换菜单栏伸缩状态
     */
    changeSidebarOpened() {
      this.commit('common/changeSidebarOpened')
    },
    /**
     * 登录请求动作
     * @param {*} context
     * @param {*} loginForm 包含用户名和密码
     * @returns Promise对象
     */
    login(context, loginForm) {
      const { username, password } = loginForm
      return new Promise((resolve, reject) => {
        api.common
          .login({
            username,
            password: md5(password)
          })
          .then((data) => {
            this.commit('common/setToken', data.token) // 触发mutations里面的setToken()函数
            // TODO 这里要不要用commit？
            setTokenTimestamp()
            setStorageItem('username', username) // 记住账号
            router.push('/')
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    /**
     * 获取用户信息
     * @param {*} context
     */
    async getProfile(context) {
      const data = await api.common.getProfile()
      this.commit('common/setProfile', data) // 触发mutations里面的setProfile()函数
      return data
    },
    /**
     * 退出登录（用户主动退出方案）
     */
    logout() {
      // 清理vuex
      this.commit('common/setToken', '') // 清理token
      this.commit('common/setProfile', {}) // 清理用户信息
      // 清理LocalStorage
      const username = getStorageItem('username')
      removeAllStorageItem()
      setStorageItem('username', username)
      // TODO 清理权限相关配置
      // 返回登录页
      router.push('/login')
    }
  }
}
