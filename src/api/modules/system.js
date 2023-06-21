import request from '../request'

const API_PREFIX = '/sys'

/**
 * 获取验证码
 */
export const getCaptcha = () => {
  return request({
    url: API_PREFIX + '/common/getCaptcha'
  })
}

/**
 * 用户登录
 * @param { username, password, captchaKey, captchaInput } loginForm 登录动作提交的表单
 */
export const login = (loginForm) => {
  console.log(loginForm)
  return request({
    method: 'post',
    url: API_PREFIX + '/user/login',
    data: loginForm
  })
}

/**
 * 获取用户个人信息
 */
export const getProfile = () => {
  return request({
    url: API_PREFIX + '/user/getProfile'
  })
}

/**
 * 退出登录
 */
export const logout = () => {
  return request({
    url: API_PREFIX + '/user/logout'
  })
}
