<template>
  <el-dialog :model-value="props.visable" @close="onClose" center>
    <template #title>
      <h2>注册成为OneAdmin用户</h2>
    </template>
    <el-form class="registry-form" ref="registryRef" :rules="registryRules" :model="registryInput" size="large"
      label-width="78px">
      <el-form-item label="用户名" prop="username">
        <el-input name="username" placeholder="请输入用户名" v-model="registryInput.username" maxlength="16" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input name="password" placeholder="请输入密码" v-model="registryInput.password" type="password" maxlength="16"
          show-password />
      </el-form-item>
      <el-form-item label="密码确认" prop="password2">
        <el-input name="password2" placeholder="请再次输入密码" v-model="registryInput.password2" type="password" maxlength="16"
          show-password />
      </el-form-item>
      <el-form-item label="验证码" prop="captchaInput">
        <el-col :span="14">
          <el-input name="captchaInput" placeholder="验证码" maxlength="5" v-model="registryInput.captchaInput" />
        </el-col>
        <el-col :span="10">
          <div class="captcha-box" @click="refreshCaptcha">
            <el-image class="captcha-img" :src="captchaImage"></el-image>
          </div>
        </el-col>
      </el-form-item>
      <div style="text-align: left">
        <div class="tips" v-html="tipsContent"></div>
      </div>
    </el-form>
    <template #footer>
      <el-button class="registry-btn" size="large" type="primary" @click="onConfirm" :loading="loading">确定</el-button>
      <el-button class="registry-btn" size="large" @click="onClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { usernameValidator, passwordValidator, captchaValidator } from '../validator'
import api from '@/api'
import { ElMessage } from 'element-plus'

const store = useStore()

const props = defineProps({
  visable: {
    type: Boolean,
    default: false,
    required: true
  }
})
const emits = defineEmits(['close'])

// ----- 初始化 -----
// 输入的表单
const registryInput = reactive({
  username: '',
  password: '',
  password2: '',
  captchaInput: ''
})
// ----- 验证码 -----
const captchaImage = ref('')
const refreshCaptcha = () => {
  store.dispatch('common/getCaptcha').then((captchaImageBase64) => {
    captchaImage.value = captchaImageBase64
  })
}
// 监听打开对话框动作
watch(
  () => props.visable,
  () => {
    if (props.visable) {
      registryInput.username = registryInput.password = registryInput.password2 = registryInput.captchaInput = ''
      captchaImage.value = refreshCaptcha()
    }
  }
)

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 调用父组件close事件
  emits('close')
}

// ----- 注册表单验证规则 -----
const password2Validator = () => {
  return (rule, value, callback) => {
    const regexp = /^[A-Za-z0-9.~!@#$%^&*_?]{6,16}$/
    if (!value.length) {
      callback(new Error('请再次输入密码'))
    } else if (!regexp.test(value)) {
      callback(new Error('密码输入格式不正确'))
    } else if (value !== registryInput.password) {
      callback(new Error('两次输入密码不匹配'))
    } else {
      callback()
    }
  }
}
const registryRules = ref({
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
  password2: [
    {
      required: true,
      trigger: 'blur',
      validator: password2Validator()
    }
  ],
  captchaInput: [
    {
      required: true,
      trigger: 'blur',
      validator: captchaValidator()
    }
  ]
})

// ----- 点击“确定” -----
const loading = ref(false)
const registryRef = ref(null)
const onConfirm = () => {
  registryRef.value.validate((valid) => {
    if (!valid) return
    loading.value = true
    const registryForm = {}
    registryForm.username = registryInput.username
    registryForm.password = registryInput.password
    registryForm.captchaKey = store.getters.captchaKey
    registryForm.captchaInput = registryInput.captchaInput

    api.system
      .registry(registryForm)
      .then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            ElMessage.success('注册成功，欢迎成为OneAdmin新用户')
            loading.value = false
            onClose()
          } else {
            ElMessage.error(res.mesg)
            loading.value = false
            refreshCaptcha()
          }
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
        loading.value = false
        refreshCaptcha()
      })
  })
}

// 底部提示内容
const tipsContent = `
  温馨提示：<br>
  &nbsp;&nbsp;1. 用户名由大写英文字母、小写英文字母和数字组成，长度不大于16位。<br>
  &nbsp;&nbsp;2. 密码由大写英文字母、小写英文字母、数字和特殊字符.~!@#$%^&*_?组成，长度6位~16位。
`
</script>

<style lang="scss" scoped>
.registry-form {
  width: 80%;
  margin: auto;

  .captcha-box {
    border: 1px solid;
    border-color: #909399;
    height: 40px;
    cursor: pointer;

    .captcha-img {
      width: 100%;
      height: 100%;
    }
  }

  .tips {
    font-size: 10px;
    line-height: 20px;
    color: #909399;
    margin-left: 40px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
}
</style>
