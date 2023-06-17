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
  removeAllStorageItem
} from '@/utils/storage'
import api from '@/api'
import router from '@/router'
import { ElMessage } from 'element-plus'

export default {
  namespaced: true,

  // ----------
  // 存储状态的变量
  state: {
    verifyCodeKey: '',
    token: getStorageItem(TOKEN) || '',
    tokenExpiredTime: getStorageItem(TOKEN_EXPIRED_TIME) || '',
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
    // 存储验证码key
    setVerifyCodeKey(state, key) {
      state.verifyCodeKey = key
    },
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
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    // 存储个人信息
    setProfile(state, profile) {
      state.profile = profile
    },
    // 退出登录时清除state保存的量
    clearStateOnLogout(state) {
      state.verifyCodeKey = ''
      state.token = ''
      state.roles = {}
      state.permisions = {}
      state.profile = {}
      state.sidebarOpened = true
      state.viewTagList = []
    },
    // 切换菜单栏伸缩状态
    changeSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 添加新的页面标签数据到缓存中的页面标签列表中
    addViewTagList(state, tag) {
      const isFind = state.viewTagList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.viewTagList.push(tag)
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
    }
  },

  // ----------
  // 业务逻辑代码，可以异步，但不能直接操作state
  // 视图dispatch触发action，action再commit触发mutation
  actions: {
    /**
     * 获取验证码
     * @param {*} context
     * @returns 验证码Base64格式图像
     */
    getVerifyCode(context) {
      return api.system
        .getKaptcha()
        .then((res) => {
          if (res.succ) {
            const { verifyCodeKey, verifyCodeImage } = res.data
            this.commit('common/setVerifyCodeKey', verifyCodeKey)
            return verifyCodeImage
          }
        })
        .catch(() => {
          ElMessage.error('获取验证码失败')
        })
    },

    /**
     * 登录
     * @param {*} context
     * @param {*} loginForm 包含用户名和密码
     * @returns Promise对象
     */
    login(context, loginForm) {
      const { username, password, verifyCode } = loginForm
      return new Promise((resolve, reject) => {
        api.system
          .login({
            username,
            password,
            verifyCodeKey: context.state.verifyCodeKey,
            verifyCode
          })
          .then((res) => {
            // ----- 认证成功 -----
            if (res.succ) {
              const { token, tokenExpiredTime, roles, permissions } = res.data
              this.commit('common/setToken', token)
              this.commit('common/setTokenExpiredTime', tokenExpiredTime)
              this.commit('common/setRoles', roles)
              this.commit('common/setPermissions', permissions)
              setStorageItem(TOKEN, token) // 用来下次自动登录
              setStorageItem(TOKEN_EXPIRED_TIME, tokenExpiredTime)
              setStorageItem(ROLES, roles)
              setStorageItem(PERMISSIONS, permissions)
              setStorageItem('username', username) // 登录页面记住账号

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
      const res = await api.system.getProfile()
      this.commit('common/setProfile', res.data)
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
    changeSidebarOpened(context) {
      this.commit('common/changeSidebarOpened')
      setStorageItem(SIDEBAR_OPENED, context.state.sidebarOpened) // 记住菜单展开/收起状态
    },

    /**
     * 添加新的页面标签数据到缓存中的页面标签列表中
     * @param {*} context
     * @param {fullPath, meta, name, params, path, query, title} tag
     */
    addViewTagList(context, tag) {
      this.commit('common/addViewTagList', tag)
      setStorageItem(VIEW_TAG_LIST, context.state.viewTagList)
    },

    /**
     * 删除一个或多个页面标签
     * @param {*} context
     * @param {mode: 'other'||'right'||'index', index} payload 参数对象，包含mode和index（可选）属性
     */
    removeViewTags(context, payload) {
      this.commit('common/removeViewTags', payload)
      setStorageItem(VIEW_TAG_LIST, context.state.viewTagList)
    }
  }
}
