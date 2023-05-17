import request from '../request'

/**
 * 用户登录
 * @param { username, password } loginForm 登录动作提交的表单
 * @returns 请求的响应
 */
export const login = (loginForm) => {
  return request({
    method: 'POST',
    url: '/login',
    data: loginForm
  })
}

/**
 * 获取用户个人信息
 * @returns 请求的响应
 */
// export const getProfile = () => {
//   return request({
//     url: '/sys/profile'
//   })
// }
