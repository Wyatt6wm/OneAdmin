import request from '../request'

const USER = '/user'
export const registry = (registryForm) => {
  return request({
    method: 'post',
    url: USER + '/registry',
    data: registryForm
  })
}
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
export const getRoleIdentifiers = () => {
  return request({
    url: USER + '/getRoleIdentifiers'
  })
}
export const getAuthIdentifiers = () => {
  return request({
    url: USER + '/getAuthIdentifiers'
  })
}
export const getProfile = () => {
  return request({
    url: USER + '/getProfile'
  })
}
export const editProfile = (profileForm) => {
  return request({
    method: 'post',
    url: USER + '/editProfile',
    data: profileForm
  })
}
export const getUserManageList = () => {
  return request({
    url: USER + '/getUserManageList'
  })
}
export const getRolesOfUser = (userId) => {
  return request({
    url: USER + '/getRolesOfUser?userId=' + userId
  })
}
export const changeBinds = (bindForm) => {
  return request({
    method: 'post',
    url: USER + '/changeBinds',
    data: bindForm
  })
}
