import request from '../request'

/**
 * 获取验证码
 * @returns 请求的响应
 */
export const getKaptcha = () => {
  return request({
    url: '/getKaptcha'
  })
}

/**
 * 用户登录
 * @param { username, password, verifyCode } loginForm 登录动作提交的表单
 * @returns 请求的响应
 */
export const login = (loginForm) => {
  return request({
    method: 'post',
    url: '/login',
    data: loginForm
  })
}

/**
 * 获取用户个人信息
 * @returns 请求的响应
 */
export const getProfile = () => {
  return request({
    url: '/getProfile'
  })
}

/**
 * 退出登录
 * @returns 请求的响应
 */
export const logout = () => {
  return request({
    url: '/logout'
  })
}
