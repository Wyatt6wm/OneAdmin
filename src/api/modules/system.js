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
const ROLE = '/sys/role'
export const addRole = (roleForm) => {
  return request({
    method: 'post',
    url: ROLE + '/addRole',
    data: roleForm
  })
}
export const changeRoleGrants = (grantForm) => {
  return request({
    method: 'post',
    url: ROLE + '/changeRoleGrants',
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
export const getRoleList = () => {
  return request({
    url: ROLE + '/getRoleList'
  })
}
export const getRoleAuths = (id) => {
  return request({
    url: ROLE + '/getRoleAuths?id=' + id
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
export const getAuthList = () => {
  return request({
    url: AUTH + '/getAuthList'
  })
}
