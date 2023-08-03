import * as common from './modules/common'
import * as user from './modules/user'
import * as role from './modules/role'
import * as auth from './modules/auth'
import * as todo from './modules/todo'

// index.js作为api的出口，输出所有模块，包含了所有接口
export default {
  common,
  user,
  role,
  auth,
  todo
}
