import Storage from '@/utils/storage2'
import api from '@/api'
import router, { initRoutes } from '@/router'
import { ElMessage } from 'element-plus'

const TOKEN = 'token'
const TOKEN_EXPIRED_TIME = 'tokenExpiredTime'
const USERNAME = 'username'

export default {
  namespaced: true,

  state: {
    token: Storage.get(TOKEN) || '',
    tokenExpiredTime: Storage.get(TOKEN_EXPIRED_TIME) || '',
    hasRoles: false,
    roles: {},
    hasAuths: false,
    auths: {},
    hasProfile: false,
    gettingProfile: false,
    profile: {}
  },

  mutations: {
    // 存储token
    setToken(state, token) {
      state.token = token
    },
    // 存储token过期时间
    setTokenExpiredTime(state, time) {
      state.tokenExpiredTime = time
    },
    // 存储用户角色
    setRoles(state, roles) {
      state.hasRoles = true
      state.roles = roles
    },
    // 存储用户权限
    setAuths(state, auths) {
      state.hasAuths = true
      state.auths = auths
    },
    // 存储个人信息
    setProfile(state, profile) {
      state.hasProfile = true
      state.gettingProfile = false
      state.profile = profile
    },
    // 退出登录时清除state
    clearStateOnLogout(state) {
      state.token = ''
      state.tokenExpiredTime = ''
      state.hasRoles = false
      state.roles = {}
      state.hasAuths = false
      state.auths = {}
      state.hasProfile = false
      state.gettingProfile = false
      state.profile = {}
    }
  },

  actions: {
    /**
     * 登录
     * @param {*} context
     * @param {*} loginForm 包含用户名和密码
     * @returns Promise对象
     */
    login(context, loginForm) {
      const { username, password, captchaKey, captchaInput } = loginForm
      return new Promise((resolve, reject) => {
        api.system
          .login({
            username,
            password,
            captchaKey,
            captchaInput
          })
          .then((res) => {
            if (res && res.succ != null) {
              // ----- 认证成功 -----
              if (res.succ) {
                const { token, tokenExpiredTime, roles, auths } = res.data
                context.commit('setToken', token)
                context.commit('setTokenExpiredTime', tokenExpiredTime)
                context.commit('setRoles', roles)
                context.commit('setAuths', auths)
                Storage.set(TOKEN, token) // 用来下次自动登录
                Storage.set(TOKEN_EXPIRED_TIME, tokenExpiredTime)
                Storage.set(USERNAME, username) // 登录页面记住账号
                resolve()
              } else {
                // ----- 认证失败 -----
                ElMessage.error(res.mesg)
                reject(new Error(res.mesg))
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 获取用户角色
     * @param {*} context
     * @returns
     */
    getRoleIdentifiers(context) {
      return new Promise((resolve, reject) => {
        api.system
          .getRoleIdentifiers()
          .then((res) => {
            if (res && res.succ != null) {
              if (res.succ) {
                const { roles } = res.data
                context.commit('setRoles', roles)
                resolve()
              } else {
                ElMessage.error(res.mesg)
                reject(new Error(res.mesg))
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 获取用户权限
     * @param {*} context
     * @returns
     */
    getAuthIdentifiers(context) {
      return new Promise((resolve, reject) => {
        api.system
          .getAuthIdentifiers()
          .then((res) => {
            if (res && res.succ != null) {
              if (res.succ) {
                const { auths } = res.data
                context.commit('setAuths', auths)
                resolve()
              } else {
                ElMessage.error(res.mesg)
                reject(new Error(res.mesg))
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 获取用户信息
     * @param {*} context
     */
    getProfile(context) {
      context.state.gettingProfile = true
      return new Promise((resolve, reject) => {
        api.system
          .getProfile()
          .then((res) => {
            if (res && res.succ != null) {
              if (res.succ) {
                const { profile } = res.data
                context.commit('setProfile', profile)
                resolve()
              } else {
                ElMessage.error(res.mesg)
                reject(new Error(res.mesg))
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 退出登录（用户主动退出方案）
     */
    logout() {
      return new Promise((resolve, reject) => {
        api.system
          .logout()
          .then((res) => {
            if (res && res.succ != null) {
              // ----- 退出登录成功 -----
              if (res.succ) {
                // 清理路由表
                initRoutes()
                // 清理vuex
                this.commit('viewSettings/clearStateOnLogout')
                this.commit('common/clearStateOnLogout')
                this.commit('userLogin/clearStateOnLogout')
                // 清理LocalStorage
                const username = Storage.get(USERNAME)
                Storage.removeAll()
                Storage.set(USERNAME, username)
                // 返回登录页
                router.push('/login')
                resolve()
              } else {
                // ----- 退出登录失败 -----
                ElMessage.error(res.mesg)
                reject(new Error(res.mesg))
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
