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
export const getRolesOfUser = (id) => {
  return request({
    url: USER + '/getRolesOfUser?id=' + id
  })
}
export const changeBinds = (bindForm) => {
  return request({
    method: 'post',
    url: USER + '/changeBinds',
    data: bindForm
  })
}

// ---------- Role ----------
const ROLE = '/sys/role'
export const addRole = (roleForm) => {
  return request({
    method: 'post',
    url: ROLE + '/addRole',
    data: roleForm
  })
}
export const changeGrants = (grantForm) => {
  return request({
    method: 'post',
    url: ROLE + '/changeGrants',
    data: grantForm
  })
}
export const removeRole = (id) => {
  return request({
    url: ROLE + '/removeRole?id=' + id
  })
}
export const editRole = (roleForm) => {
  return request({
    method: 'post',
    url: ROLE + '/editRole',
    data: roleForm
  })
}
export const getRoleManageList = () => {
  return request({
    url: ROLE + '/getRoleManageList'
  })
}
export const getAuthsOfRole = (id) => {
  return request({
    url: ROLE + '/getAuthsOfRole?id=' + id
  })
}

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
export const getAuthManageList = () => {
  return request({
    url: AUTH + '/getAuthManageList'
  })
}
