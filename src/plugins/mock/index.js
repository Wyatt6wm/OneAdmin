import Mock from 'mockjs'
import * as common from './modules/common'

// 1. 开启/关闭[所有模块]拦截, 通过调整[allActive参数]设置.
// 2. 开启/关闭[业务模块]拦截, 通过调整各模块的[moduleActive参数]设置.
// 3. 开启/关闭[业务模块中某个API请求]拦截, 通过函数返回对象中的[apiActive属性]设置.
// moduleActive参数列表
const commonActive = true

/**
 * 创建mock模拟数据
 * @param {*} module 模块
 * @param {*} moduleActive 是否开启
 */
function fnCreate(module, moduleActive) {
  if (moduleActive) {
    for (var key in module) {
      const response = module[key]() || {}
      const interceptor = (res) => {
        if (res.apiActive !== false) {
          const url = '/api' + res.url
          Mock.mock(new RegExp(url), res.type, (opts) => {
            opts.data = opts.body ? JSON.parse(opts.body) : null
            delete opts.body
            console.log('\n')
            console.log('%cMock拦截: ', 'color:blue', opts)
            console.log('%cMock响应: ', 'color:blue', res.data)
            return res.data
          })
        }
      }
      interceptor(response)
    }
  }
}

export default (allActive) => {
  fnCreate(common, allActive && commonActive)
}
