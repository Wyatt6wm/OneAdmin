import store from '@/store'

export function validAuthOr(el, binding) {
  // 指令绑定的权限名数组
  const authNames = binding.value
  // 用户所绑定的权限列表
  const auths = store.getters.auths

  // 要求绑定值是数组形式
  if (authNames && authNames instanceof Array) {
    let valid = false
    for (var i = 0; i < authNames.length; i++) {
      if (auths.includes(authNames[i])) {
        valid = true
        break
      }
    }
    // 如果不满足要求则不显示该元素
    if (!valid) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('Bound value must be an instance of Array.')
  }
}

export function validAuthAnd(el, binding) {
  // 指令绑定的权限名数组
  const authNames = binding.value
  // 用户所绑定的权限列表
  const auths = store.getters.auths

  // 要求绑定值是数组形式
  if (authNames && authNames instanceof Array) {
    let valid = true
    for (var i = 0; i < authNames.length; i++) {
      if (!auths.includes(authNames[i])) {
        valid = false
        break
      }
    }
    // 如果不满足要求则不显示该元素
    if (!valid) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('Bound value must be an instance of Array.')
  }
}
