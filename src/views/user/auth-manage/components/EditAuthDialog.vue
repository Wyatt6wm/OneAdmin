<template>
  <el-dialog :model-value="visable" :title="title" @close="onClose()">
    <el-form :model="authForm">
      <el-form-item>
        <el-switch v-model="editIdentifier" active-text="修改权限标识符" />
        <el-input placeholder="请输入新的权限标识符" v-model="authForm.identifier" :disabled="!editIdentifier" clearable />
      </el-form-item>
      <el-form-item>
        <el-switch v-model="editName" active-text="修改权限名称" />
        <el-input placeholder="请输入新的权限名称" v-model="authForm.name" :disabled="!editName" clearable />
      </el-form-item>
      <el-form-item>
        <el-switch v-model="editDescription" active-text="修改权限描述" />
        <el-input placeholder="请输入新的权限描述" v-model="authForm.description" :disabled="!editDescription" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="onConfirm()" :loading="loading">确定</el-button>
      <el-button @click="onClose()">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive, watch } from 'vue'
import api from '@/api'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visable: {
    type: Boolean,
    default: false,
    required: true
  },
  auth: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['closeDialog', 'updateAfterEdit'])

// ----- 初始化 -----
// 标题
const title = ref('')
// 开关
const editIdentifier = ref(false)
const editName = ref(false)
const editDescription = ref(false)
// 提交的表单
const authForm = reactive({
  identifier: '',
  name: '',
  description: ''
})
// 监听打开对话框动作
watch(
  () => props.visable,
  () => {
    title.value = '编辑权限【' + props.auth.identifier + ' ' + props.auth.name + '】'
    authForm.identifier = props.auth.identifier
    authForm.name = props.auth.name
    authForm.description = props.auth.description
  },
  {
    immediate: true
  }
)

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 还原初始值
  editIdentifier.value = false
  editName.value = false
  editDescription.value = false
  authForm.identifier = authForm.name = authForm.description = ''
  // 调用父组件closeDialog事件
  emits('closeDialog')
}

// ----- 点击“确定” -----
const loading = ref(false)
const onConfirm = () => {
  loading.value = true

  authForm.id = props.auth.id
  if (!editIdentifier.value) authForm.identifier = null
  if (!editName.value) authForm.name = null
  if (!editDescription.value) authForm.description = null

  if (editIdentifier.value || editName.value || editDescription.value) {
    api.system.editAuth(authForm).then((res) => {
      if (res.succ) {
        ElMessage.success('保存成功')
        loading.value = false
        onClose()
        // 调用父组件updateAfterEdit事件
        emits('updateAfterEdit')
      } else {
        ElMessage.error(res.mesg)
        loading.value = false
      }
    }).catch((error) => {
      ElMessage.error(error.message)
      loading.value = false
    })
  } else {
    ElMessage.warning('未进行编辑')
    loading.value = false
    onClose()
  }
}
</script>
