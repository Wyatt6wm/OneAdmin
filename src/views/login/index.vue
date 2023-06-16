<!-- 登录页面 -->
<template>
  <div class="login-container">
    <el-form class="login-form" ref="loginFormRef" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">登录OneAdmin</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input type="text" placeholder="用户名" name="username" maxlength="16" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input :type="passwordType" placeholder="密码" name="password" maxlength="16"
          v-model="loginForm.password"></el-input>
        <span class="show-pwd" @click="onChangePwdType">
          <svg-icon :icon="passwordType === 'password' ? 'eye' : 'eye-open'"></svg-icon>
        </span>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-col :span="14">
          <span class="svg-container">
            <svg-icon icon="article-create"></svg-icon>
          </span>
          <el-input type="text" placeholder="验证码" name="verifyCode" maxlength="10"
            v-model="loginForm.verifyCode"></el-input>
        </el-col>
        <el-col :span="10">
          <div class="verify-code-box" @click="refreshVerifyCode">
            <el-image class="verify-code-img" :src="verifyCodeBase64"></el-image>
          </div>
        </el-col>
      </el-form-item>
      <div>
        <el-row :gutter="10">
          <el-col :span="17"></el-col>
          <el-col :span="3"><el-link type="primary" @click="comingSoon()">注册用户</el-link></el-col>
          <el-col :span="4"><el-link type="primary" @click="comingSoon()">忘记密码</el-link></el-col>
        </el-row>
      </div>
      <!-- TODO 注册和忘记密码功能 -->
      <el-button type="primary" style="width:100%;margin-top:20px;margin-bottom:30px" :loading="loading"
        @click="handleLogin()">
        登录
      </el-button>
      <div class="tips" v-html="tipsContent"></div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { usernameValidator, passwordValidator, verifyCodeValidator } from './validator'
import { getStorageItem } from '@/utils/storage'
import { comingSoon } from '@/utils/common'

const store = useStore() // 获取vuex实例store
const router = useRouter() // 获取router实例

// 底部提示内容
const tipsContent = `
  温馨提示：<br>
  &nbsp;&nbsp;1. 用户名由大写英文字母、小写英文字母和数字组成，长度不大于16位。<br>
  &nbsp;&nbsp;2. 密码由大写英文字母、小写英文字母、数字和特殊字符.~!@#$%^&*_?组成，长度8位~16位。
`

// 表单数据
const loginForm = ref({
  username: getStorageItem('username') || '', // 自动填充记住的用户名
  password: '',
  verifyCode: ''
})

// 登录表单验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur', // 移开光标时
      validator: usernameValidator()
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: passwordValidator()
    }
  ],
  verifyCode: [
    {
      required: true,
      trigger: 'blur',
      validator: verifyCodeValidator()
    }
  ]
})

// ----- 密码框密文/明文显示 -----
const passwordType = ref('password')
const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

// ----- 验证码：初始化+刷新 -----
const verifyCodeBase64 = ref('')
const refreshVerifyCode = () => {
  store.dispatch('common/getVerifyCode').then((base64Iamge) => {
    verifyCodeBase64.value = base64Iamge
  })
}
verifyCodeBase64.value = refreshVerifyCode()

// ----- 登录 -----
const loading = ref(false)
const loginFormRef = ref(null) // 绑定上面声明了ref="loginFormRef"的<el-form>的实例
const handleLogin = () => {
  // 1、表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return
    // 2、登录动作
    loading.value = true
    store
      .dispatch('common/login', loginForm.value) // 通过vuex封装的动作（login模块的login action）来访问后端API并获取token等
      .then(() => {
        loading.value = false
        router.push('/') // 3、登录后操作：前往主页
      })
      .catch((err) => {
        console.log(err)
        loading.value = false
        refreshVerifyCode()
      })
  })
}
// 回车登录
document.onkeydown = (event) => {
  if (event.keyCode === 13) {
    handleLogin()
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    // 深度选择器来选择父组件里面的子组件
    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        // -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }

    .verify-code-box {
      height: 47px;
      // padding-right: 12px;

      .verify-code-img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .tips {
    font-size: 10px;
    line-height: 20px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
