import request from '../request'

const TODO = '/todo'
export const saveDraft = (todoForm) => {
  return request({
    method: 'post',
    url: TODO + '/saveDraft',
    data: todoForm
  })
}
export const submitTodo = (todoForm) => {
  return request({
    method: 'post',
    url: TODO + '/submitTodo',
    data: todoForm
  })
}
export const removeDraft = (uuid) => {
  return request({
    url: TODO + '/removeDraft/' + uuid
  })
}
export const toProgress = (uuid) => {
  return request({
    url: TODO + '/toProgress/' + uuid
  })
}
export const toEdit = (uuid) => {
  return request({
    url: TODO + '/toEdit/' + uuid
  })
}
export const finishTodo = (todoForm) => {
  return request({
    method: 'post',
    url: TODO + '/finishTodo',
    data: todoForm
  })
}
export const cancelTodo = (todoForm) => {
  return request({
    method: 'post',
    url: TODO + '/cancelTodo',
    data: todoForm
  })
}
export const getTodoList = (category) => {
  return request({
    url: TODO + '/getTodoList/' + category
  })
}
export const getTodo = (uuid) => {
  return request({
    url: TODO + '/getTodo/' + uuid
  })
}
