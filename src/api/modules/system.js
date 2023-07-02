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
  return request({
    method: 'post',
    url: API_PREFIX + '/user/login',
    data: loginForm
  })
}

/**
 * 获取用户角色
 */
export const getRoles = () => {
  return request({
    url: API_PREFIX + '/role/getRoles'
  })
}

/**
 * 获取用户权限
 */
export const getAuths = () => {
  return request({
    url: API_PREFIX + '/auth/getAuths'
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

/**
 * 获取用户权限详细列表
 */
export const getAuthDetails = () => {
  return request({
    url: API_PREFIX + '/auth/getAuthDetails'
  })
}

/**
 * 编辑权限
 * @param {id 必填, identifier, name, description, activated} authForm 提交的表单
 */
export const editAuth = (authForm) => {
  return request({
    method: 'post',
    url: API_PREFIX + '/auth/editAuth',
    data: authForm
  })
}
