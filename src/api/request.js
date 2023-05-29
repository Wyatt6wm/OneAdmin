// 自定义封装axios后的请求服务

import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isTokenTimeout } from '@/utils/token'

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
    if (store.getters.token) {
      // 用户被动退出的主动处理方案：token超时，被动退出
      if (isTokenTimeout()) {
        store.dispatch('common/logout')
        return Promise.reject(new Error('登录超时'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}` // 在报文头中注入token
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
  // 请求成功时的处理函数
  (response) => {
    const { succ, code, mesg, data } = response.data
    // 要根据succ的（业务层面上的）成功与否决定接下来的操作
    if (succ) {
      return data // 成功时返回解析后的业务数据
    } else {
      // 业务失败时（请求成功，但业务失败）
      // TODO 失败处理情形
      ElMessage.error('' + code + mesg)
      return Promise.reject(new Error('' + code + mesg))
    }
  },
  // 请求失败时（如404）的处理函数
  (error) => {
    // 用户被动退出的被动处理方案（后端通过状态码通知前端进行处理）
    // 1、其他设备登录，本设备强制下线（这里没实现）
    // 2、token过期
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('common/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
