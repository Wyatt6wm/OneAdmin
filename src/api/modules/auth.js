import request from '../request'

const AUTH = '/auth'
export const addAuth = (authForm) => {
  return request({
    method: 'post',
    url: AUTH + '/addAuth',
    data: authForm
  })
}
export const removeAuth = (authId) => {
  return request({
    url: AUTH + '/removeAuth?authId=' + authId
  })
}
export const editAuth = (authForm) => {
  return request({
    method: 'post',
    url: AUTH + '/editAuth',
    data: authForm
  })
}
export const getAuthManageList = () => {
  return request({
    url: AUTH + '/getAuthManageList'
  })
}
