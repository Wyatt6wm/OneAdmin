// 全局的vuex配置

import {
  TOKEN,
  TOKEN_EXPIRED_TIME,
  ROLES,
  PERMISSIONS,
  SIDEBAR_OPENED,
  VIEW_TAG_LIST
} from '@/constant'
import {
  getStorageItem,
  setStorageItem,
  // removeStorageItem,
  removeAllStorageItem
} from '@/utils/storage'
import api from '@/api'
import router from '@/router'
import { ElMessage } from 'element-plus'

export default {
  namespaced: true,

  // 存储状态的变量
  state: {
    token: getStorageItem(TOKEN) || '', // 先从LocalStorage获取token，没有时再赋默认值空
    roles: getStorageItem(ROLES) || {},
    permissions: getStorageItem(PERMISSIONS) || {},
    profile: {},
    sidebarOpened:
      getStorageItem(SIDEBAR_OPENED) == null
        ? true
        : getStorageItem(SIDEBAR_OPENED),
    viewTagList: getStorageItem(VIEW_TAG_LIST) || []
  },

  // ----------
  // mutation翻译：变化
  // 专注于修改state，理论上是修改state的唯一途径，必须同步执行
  mutations: {
    // 存储token及其过期时间
    setToken(state, payload) {
      state.token = payload.token
      setStorageItem(TOKEN, payload.token) // 用来下次自动登录
      setStorageItem(TOKEN_EXPIRED_TIME, payload.tokenExpiredTime)
    },

    // 存储用户角色
    setRoles(state, roles) {
      state.roles = roles
      setStorageItem(ROLES, roles)
    },

    // 存储用户权限
    setPermissions(state, permissions) {
      state.permissions = permissions
      setStorageItem(PERMISSIONS, permissions)
    },

    // 存储个人信息
    setProfile(state, profile) {
      state.profile = profile
    },

    // 退出登录时清除state保存的量
    clearStateOnLogout(state) {
      state.token = ''
      state.permision = {}
      state.profile = {}
      state.sidebarOpened = true
      state.viewTagList = []
    },

    // 切换菜单栏伸缩状态
    changeSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
      setStorageItem(SIDEBAR_OPENED, state.sidebarOpened) // 记住菜单展开/收起状态
    },

    // 添加新的页面标签数据到缓存中的页面标签列表中
    addViewTagList(state, tag) {
      const isFind = state.viewTagList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.viewTagList.push(tag)
        setStorageItem(VIEW_TAG_LIST, state.viewTagList)
      }
    },

    // 删除一个或多个标签
    removeViewTags(state, payload) {
      const mode = payload.mode
      const index = payload.index
      if (mode === 'index') {
        state.viewTagList.splice(index, 1)
      } else if (mode === 'all') {
        let viewTagIndex = -1
        for (let i = 0; i < state.viewTagList.length; i++) {
          // 如果主页重定向的页面改了，这里的路径也要改
          if (state.viewTagList[i].fullPath === '/profile') {
            viewTagIndex = i
            break
          }
        }
        if (viewTagIndex === -1) {
          state.viewTagList = []
        } else {
          state.viewTagList.splice(
            viewTagIndex + 1,
            state.viewTagList.length - viewTagIndex + 1
          )
          state.viewTagList.splice(0, viewTagIndex)
        }
      } else if (mode === 'other') {
        state.viewTagList.splice(
          index + 1,
          state.viewTagList.length - index + 1
        )
        state.viewTagList.splice(0, index)
      } else if (mode === 'right') {
        state.viewTagList.splice(
          index + 1,
          state.viewTagList.length - index + 1
        )
      }
      setStorageItem(VIEW_TAG_LIST, state.viewTagList)
    }
  },

  // ----------
  // 业务逻辑代码，可以异步，但不能直接操作state
  // 视图dispatch触发action，action再commit触发mutation
  actions: {
    /**
     * 登录
     * @param {*} context
     * @param {*} loginForm 包含用户名和密码
     * @returns Promise对象
     */
    login(context, loginForm) {
      const { username, password, verifyCode } = loginForm
      return new Promise((resolve, reject) => {
        api.common
          .login({
            username,
            password,
            verifyCode
          })
          .then((res) => {
            // ----- 认证成功 -----
            if (res.succ) {
              const payload = {
                token: res.data.token,
                tokenExpiredTime: res.data.tokenExpiredTime
              }
              this.commit('common/setToken', payload)
              setStorageItem('username', username) // 登录页面记住账号

              const roles = res.data.roles
              const permissions = res.data.permissions
              this.commit('common/setRoles', roles)
              this.commit('common/setPermissions', permissions)

              router.push('/')
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
      const data = await api.common.getProfile()
      this.commit('common/setProfile', data) // 触发mutations里面的setProfile()函数
      return data
    },

    /**
     * 退出登录（用户主动退出方案）
     */
    logout() {
      return new Promise((resolve, reject) => {
        api.common
          .logout()
          .then((res) => {
            // ----- 退出登录成功 -----
            if (res.succ) {
              // 清理vuex
              this.commit('common/clearStateOnLogout')
              // 清理LocalStorage
              const username = getStorageItem('username')
              removeAllStorageItem()
              setStorageItem('username', username)

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
    },

    /**
     * 切换菜单栏伸缩状态
     */
    changeSidebarOpened() {
      this.commit('common/changeSidebarOpened')
    },

    /**
     * 添加新的页面标签数据到缓存中的页面标签列表中
     * @param {*} context
     * @param {fullPath, meta, name, params, path, query, title} tag
     */
    addViewTagList(context, tag) {
      this.commit('common/addViewTagList', tag)
    },

    /**
     * 删除一个或多个页面标签
     * @param {*} context
     * @param {mode: 'other'||'right'||'index', index} payload 参数对象，包含mode和index（可选）属性
     */
    removeViewTags(context, payload) {
      this.commit('common/removeViewTags', payload)
    }
  }
}
