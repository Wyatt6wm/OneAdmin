// 自定义封装axios后的请求服务

import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isTokenExpired } from '@/utils/token'
import { requestLog, requestErr, responseLog, responseErr } from '@/utils/log'

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
      if (isTokenExpired()) {
        store.dispatch('userLogin/logout')
        return Promise.reject(new Error('登录已过期，请重新登录'))
      }
      config.headers.token = `${store.getters.token}` // Sa-Token框架要求在报文头中注入token
    }
    requestLog(config)
    // 必须返回config对象
    return config
  },
  (error) => {
    requestErr(error)
    ElMessage.error('请求发送失败')
  }
)

// axios实例的响应拦截器
service.interceptors.response.use(
  // ----- 1.网络请求成功时 -----
  async (response) => {
    const { config, data } = response
    const res = data
    responseLog(config, res)
    // 用户被动退出的被动处理方案（后端通过状态码通知前端进行处理）
    if (res.succ != null && !res.succ && res.data && res.data.code && res.data.code === 401) {
      console.log('登录过期')
      ElMessage.error('登录已过期，请重新登录')
      await store.dispatch('userLogin/logout')
      // 注意：这里处理未登录会拦截掉原请求的返回值
    } else {
      console.log('向调用方返回响应数据')
      return res // 由于业务处理有差异，成功/失败都交给对应逻辑单独处理
    }
  },
  // ----- 2.网络请求失败时（如500） -----
  (error) => {
    const status = error.response.status
    let mesg = '未知错误'
    switch (status) {
      case 500:
        mesg = '服务器连接失败'
        break
    }
    responseErr(error, mesg)
    console.log('向调用方返回错误信息')
    return new Error(mesg)
  }
)

export default service
