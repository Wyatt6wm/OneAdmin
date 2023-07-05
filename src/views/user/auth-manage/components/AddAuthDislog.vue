<template>
  <el-dialog :model-value="props.visable" title="新增权限" @close="onClose()">
    <el-form :model="authForm" ref="authFormRef" :rules="authRules" label-width="100px" label-position="right">
      <el-form-item label="权限标识符" prop="identifier">
        <el-input :placeholder="identifierPlaceholder" v-model="authForm.identifier" clearable />
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input :placeholder="namePlaceholder" v-model="authForm.name" clearable />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input :placeholder="descriptionPlaceholder" v-model="authForm.description" type="textarea" />
      </el-form-item>
      <el-form-item label="是否立即生效">
        <el-switch v-model="authForm.activated"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onConfirm()" :loading="loading">确定</el-button>
      <el-button @click="onClose()">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive } from 'vue'
import api from '@/api'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visable: {
    type: Boolean,
    default: false,
    required: true
  }
})
const emits = defineEmits(['close', 'updateAfterAdd'])

// ----- 初始化 -----
const identifierPlaceholder = ref('请输入权限标识符，格式如：view:userManage / api:sys:auth:list')
const namePlaceholder = ref('请输入权限名称')
const descriptionPlaceholder = ref('请输入权限描述')
// 提交的表单
const authForm = reactive({
  identifier: '',
  name: '',
  description: '',
  activated: false
})
// 校验规则
const authRules = ref({
  identifier: [
    {
      required: true,
      trigger: 'blur', // 移开光标时
      message: '请输入权限标识符'
    }
  ]
})

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 还原初始值
  authForm.identifier = authForm.name = authForm.description = ''
  authForm.activated = false
  // 调用父组件close事件
  emits('close')
}

// ----- 点击“确定” -----
const loading = ref(false)
const authFormRef = ref(null) // 绑定上面声明了ref="authFormRef"的<el-form>的实例
const onConfirm = () => {
  authFormRef.value.validate((pass) => {
    if (!pass) return

    loading.value = true
    api.system.addAuth(authForm).then((res) => {
      if (res.succ) {
        ElMessage.success('权限新建成功')
        loading.value = false
        onClose()
        // 调用父组件updateAfterAdd事件
        emits('updateAfterAdd')
      } else {
        ElMessage.error(res.mesg)
        loading.value = false
      }
    }).catch((error) => {
      ElMessage.error(error.message)
      loading.value = false
    })
  })
}
</script>
