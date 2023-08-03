// 公共
import api from '@/api'
import { ElMessage } from 'element-plus'

export default {
  namespaced: true,

  // ----------
  // 存储状态的变量
  state: {
    captchaKey: '',
    routesPrepared: false
  },

  // ----------
  // mutation翻译：变化
  // 专注于修改state，理论上是修改state的唯一途径，必须同步执行
  mutations: {
    // 存储验证码KEY
    setCaptchaKey(state, key) {
      state.captchaKey = key
    },
    // 设置路由准备标志
    setRoutesPrepared(state, flag) {
      state.routesPrepared = flag
    },
    // 退出登录时清除state
    clearStateOnLogout(state) {
      state.captchaKey = ''
      state.routesPrepared = false
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
    getCaptcha(context) {
      return new Promise((resolve, reject) => {
        api.common
          .getCaptcha()
          .then((res) => {
            if (res && res.succ != null) {
              if (res.succ) {
                const { captchaKey, captchaImage } = res.data
                context.commit('setCaptchaKey', captchaKey)
                resolve(captchaImage)
              } else {
                ElMessage.error('获取验证码失败')
              }
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 将routesPrepared设置成true
     * @param {*} context
     */
    setRoutesPreparedTrue(context) {
      console.log('setRoutesPreparedTrue()')
      context.commit('setRoutesPrepared', true)
    },

    /**
     * 将routesPrepared设置成false
     * @param {*} context
     */
    setRoutesPreparedFalse(context) {
      console.log('setRoutesPreparedFalse()')
      context.commit('setRoutesPrepared', false)
    }
  }
}
