import request from '../request'

const ROLE = '/role'
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
export const removeRole = (roleId) => {
  return request({
    url: ROLE + '/removeRole?roleId=' + roleId
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
export const getAuthsOfRole = (roleId) => {
  return request({
    url: ROLE + '/getAuthsOfRole?roleId=' + roleId
  })
}
