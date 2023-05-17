export const usernameValidator = () => {
  return (rule, value, callback) => {
    // TODO 上线前替换成我自己的规则
    // const regexp = /^[A-Za-z0-9]{1,16}$/
    const regexp = /^[A-Za-z0-9-]{1,16}$/
    if (!value.length) {
      callback(new Error('请输入用户名'))
    } else if (!regexp.test(value)) {
      callback(new Error('用户名输入格式不正确'))
    } else {
      callback()
    }
  }
}

export const passwordValidator = () => {
  return (rule, value, callback) => {
    // TODO 上线前替换成我自己的规则
    // const regexp = /^[A-Za-z0-9.~!@#$%^&*_?]{8,16}$/
    const regexp = /^[A-Za-z0-9.~!@#$%^&*_?]{6,16}$/
    if (!value.length) {
      callback(new Error('请输入密码'))
    } else if (!regexp.test(value)) {
      callback(new Error('密码输入格式不正确'))
    } else {
      callback()
    }
  }
}
