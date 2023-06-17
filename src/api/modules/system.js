import request from '../request'

const API_PREFIX = '/sys'

/**
 * 获取验证码
 */
export const getKaptcha = () => {
  return request({
    url: API_PREFIX + '/getKaptcha'
  })
}

/**
 * 用户登录
 * @param { username, password, verifyCode } loginForm 登录动作提交的表单
 */
export const login = (loginForm) => {
  return request({
    method: 'post',
    url: API_PREFIX + '/login',
    data: loginForm
  })
}

/**
 * 获取用户个人信息
 */
export const getProfile = () => {
  return request({
    url: API_PREFIX + '/getProfile'
  })
}

/**
 * 退出登录
 */
export const logout = () => {
  return request({
    url: API_PREFIX + '/logout'
  })
}
