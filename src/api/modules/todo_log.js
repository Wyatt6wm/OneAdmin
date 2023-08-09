import request from '../request'

const TODO_LOG = '/todo-log'
export const getTodoLogList = (uuid) => {
  return request({
    url: TODO_LOG + '/getTodoLogList/' + uuid
  })
}
export const addTodoLog = (todoLogForm) => {
  return request({
    method: 'post',
    url: TODO_LOG + '/addTodoLog',
    data: todoLogForm
  })
}
