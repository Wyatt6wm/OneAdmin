const loginActive = true

// 登录接口
export function login() {
  const data = {
    succ: true,
    mesg: null,
    data: {
      token: '77ae89be36504adfb5c09ef71409ea0e',
      avatar: ''
    }
  }
  return {
    apiActive: loginActive,
    url: '/login',
    type: 'post', // 必须要小写
    data
  }
}
