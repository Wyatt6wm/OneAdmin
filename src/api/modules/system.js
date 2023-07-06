import request from '../request'

// ---------- Common ----------
const COMMON = '/sys/common'
export const getCaptcha = () => {
  return request({
    url: COMMON + '/getCaptcha'
  })
}

// ---------- User ----------
const USER = '/sys/user'
export const login = (loginForm) => {
  return request({
    method: 'post',
    url: USER + '/login',
    data: loginForm
  })
}
export const logout = () => {
  return request({
    url: USER + '/logout'
  })
}
export const getRolesOfUser = () => {
  return request({
    url: USER + '/getRolesOfUser'
  })
}
export const getAuthsOfUser = () => {
  return request({
    url: USER + '/getAuthsOfUser'
  })
}
export const getProfile = () => {
  return request({
    url: USER + '/getProfile'
  })
}
// ---------- Role ----------

// ---------- Auth ----------
const AUTH = '/sys/auth'
export const addAuth = (authForm) => {
  return request({
    method: 'post',
    url: AUTH + '/addAuth',
    data: authForm
  })
}
export const removeAuth = (id) => {
  return request({
    url: AUTH + '/removeAuth?id=' + id
  })
}
export const editAuth = (authForm) => {
  return request({
    method: 'post',
    url: AUTH + '/editAuth',
    data: authForm
  })
}
export const getAuthList = () => {
  return request({
    url: AUTH + '/getAuthList'
  })
}
