// 官方文档：https://cn.vuejs.org/guide/reusability/custom-directives.html#introduction
import { validRoleOr, validRoleAnd } from './v-role'
import { validAuthOr, validAuthAnd } from './v-auth'

// 自定义指令注册函数，接受一个Vue应用实例作为参数
export default (app) => {
  // 注册指令v-role（OR模式）
  app.directive('role', (el, binding) => {
    // 简化形式，等价于在mounted和update两个钩子实现相同的行为，其他钩子不定义
    validRoleOr(el, binding)
  })
  app.directive('roleAnd', (el, binding) => {
    validRoleAnd(el, binding)
  })

  // 注册指令v-auth（OR模式）
  app.directive('auth', (el, binding) => {
    validAuthOr(el, binding)
  })
  app.directive('authAnd', (el, binding) => {
    validAuthAnd(el, binding)
  })
}
