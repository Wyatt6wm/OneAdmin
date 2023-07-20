import request from '../request'

// ----- Todo -----
export const saveDraft = (todoForm) => {
  return request({
    method: 'post',
    url: '/todo/saveDraft',
    data: todoForm
  })
}
export const submitTodo = (todoForm) => {
  return request({
    method: 'post',
    url: '/todo/submitTodo',
    data: todoForm
  })
}
export const removeDraft = (todoId) => {
  return request({
    url: '/todo/removeDraft?todoId=' + todoId
  })
}
export const toProgress = (todoId) => {
  return request({
    url: '/todo/toProgress?todoId=' + todoId
  })
}
export const toEdit = (todoId) => {
  return request({
    url: '/todo/toEdit?todoId=' + todoId
  })
}
export const finishTodo = (todoForm) => {
  return request({
    method: 'post',
    url: '/todo/finishTodo',
    data: todoForm
  })
}
export const cancelTodo = (todoForm) => {
  return request({
    method: 'post',
    url: '/todo/cancelTodo',
    data: todoForm
  })
}
export const getTodoList = (category) => {
  return request({
    url: '/todo/getTodoList?category=' + category
  })
}
export const getTodo = (todoId) => {
  return request({
    url: '/todo/getTodo?todoId=' + todoId
  })
}

// ----- TodoLog -----
export const getTodoLogList = (todoId) => {
  return request({
    url: '/todo/log/getTodoLogList?todoId=' + todoId
  })
}
export const addTodoLog = (todoLogForm) => {
  return request({
    method: 'post',
    url: '/todo/log/addTodoLog',
    data: todoLogForm
  })
}
