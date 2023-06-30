// 自定义封装axios后的请求服务

import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isTokenExpired } from '@/utils/token'

// 自定义请求服务（axios自定义实例），配置项见：https://www.axios-http.cn/docs/req_config
const service = axios.create({
  // 默认请求方法
  method: 'GET',
  // 基础url前缀
  baseURL: '/api',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 返回数据类型
  responseType: 'json',
  // 设置超时时间
  timeout: 10000 // 单位：ms
})

// axios实例的请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log('Requesting API: ' + config.baseURL + config.url)
    if (store.getters.token) {
      // 用户被动退出的主动处理方案：token超时，被动退出
      if (isTokenExpired()) {
        store.dispatch('userLogin/logout')
        return Promise.reject(new Error('登录过期'))
      }
      config.headers.token = `${store.getters.token}` // Sa-Token框架要求在报文头中注入token
    }
    // 必须返回config对象
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// axios实例的响应拦截器
service.interceptors.response.use(
  // ----- 1.网络请求成功时 -----
  (response) => {
    return response.data // 由于业务处理有差异，成功/失败都交给对应逻辑单独处理
  },
  // ----- 2.网络请求失败时（如404） -----
  (error) => {
    // 用户被动退出的被动处理方案（后端通过状态码通知前端进行处理）
    // 1、其他设备登录，本设备强制下线（这里没实现）
    // 2、token过期
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401 // TODO 这里的状态码要改
    ) {
      store.dispatch('userLogin/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
