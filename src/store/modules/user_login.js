// 用户元数据

import Storage from '@/utils/storage2'
import api from '@/api'
import router from '@/router'
import { ElMessage } from 'element-plus'
import publicRoutes from '@/router/public_routes'

const TOKEN = 'token'
const TOKEN_EXPIRED_TIME = 'tokenExpiredTime'
const ROLES = 'roles'
const AUTHS = 'auths'
const PROFILE = 'profile'
const USERNAME = 'username'

export default {
  namespaced: true,

  state: {
    token: Storage.get(TOKEN) || '',
    tokenExpiredTime: Storage.get(TOKEN_EXPIRED_TIME) || '',
    roles: Storage.get(ROLES) || {},
    auths: Storage.get(AUTHS) || {},
    profile: Storage.get(PROFILE) || {}
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
      state.roles = roles
    },
    // 存储用户权限
    setAuths(state, auths) {
      state.auths = auths
    },
    // 存储个人信息
    setProfile(state, profile) {
      state.profile = profile
    },
    // 存储路由表
    setRoutes(state, dynamicRoutes) {
      state.routes = [...publicRoutes, ...dynamicRoutes]
    },
    // 退出登录时清除state
    clearStateOnLogout(state) {
      state.token = ''
      state.tokenExpiredTime = ''
      state.roles = {}
      state.auths = {}
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
            // ----- 认证成功 -----
            if (res.succ) {
              const { token, tokenExpiredTime, roles, auths } = res.data
              context.commit('setToken', token)
              context.commit('setTokenExpiredTime', tokenExpiredTime)
              context.commit('setRoles', roles)
              context.commit('setAuths', auths)
              Storage.set(TOKEN, token) // 用来下次自动登录
              Storage.set(TOKEN_EXPIRED_TIME, tokenExpiredTime)
              Storage.set(ROLES, roles)
              Storage.set(AUTHS, auths)
              Storage.set(USERNAME, username) // 登录页面记住账号

              resolve()
            } else {
              // ----- 认证失败 -----
              ElMessage.error(res.mesg)
              reject(new Error(res.mesg))
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
    async getProfile(context) {
      const res = await api.system.getProfile()
      context.commit('setProfile', res.data.profile)
      Storage.set(PROFILE, res.data.profile)
    },

    /**
     * 退出登录（用户主动退出方案）
     */
    logout() {
      return new Promise((resolve, reject) => {
        api.system
          .logout()
          .then((res) => {
            // ----- 退出登录成功 -----
            if (res.succ) {
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
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
