<template>
  <el-dialog :model-value="props.visable" :title="title" @close="onClose()">
    <el-form :model="roleForm">
      <el-form-item>
        <el-switch v-model="editIdentifier" active-text="修改角色标识符" />
        <el-input placeholder="请输入新的角色标识符" v-model="roleForm.identifier" :disabled="!editIdentifier" clearable />
      </el-form-item>
      <el-form-item>
        <el-switch v-model="editName" active-text="修改角色名称" />
        <el-input placeholder="请输入新的角色名称" v-model="roleForm.name" :disabled="!editName" clearable />
      </el-form-item>
      <el-form-item>
        <el-switch v-model="editDescription" active-text="修改角色描述" />
        <el-input placeholder="请输入新的角色描述" v-model="roleForm.description" :disabled="!editDescription" type="textarea" />
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
  role: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['close', 'updateAfterEdit'])

// ----- 初始化 -----
// 标题
const title = ref('')
// 开关
const editIdentifier = ref(false)
const editName = ref(false)
const editDescription = ref(false)
// 提交的表单
const roleForm = reactive({
  identifier: '',
  name: '',
  description: ''
})
// 监听打开对话框动作
watch(
  () => props.visable,
  () => {
    if (props.visable) {
      title.value = '编辑角色【' + props.role.identifier + (props.role.name ? ' / ' + props.role.name : '') + '】'
      roleForm.identifier = props.role.identifier
      roleForm.name = props.role.name
      roleForm.description = props.role.description
      loading.value = false
    }
  }
)

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 还原初始值
  editIdentifier.value = false
  editName.value = false
  editDescription.value = false
  roleForm.identifier = roleForm.name = roleForm.description = ''
  // 调用父组件close事件
  emits('close')
}

// ----- 点击“确定” -----
const loading = ref(false)
const onConfirm = () => {
  loading.value = true

  roleForm.id = props.role.id
  if (!editIdentifier.value) roleForm.identifier = null
  if (!editName.value) roleForm.name = null
  if (!editDescription.value) roleForm.description = null

  if (editIdentifier.value || editName.value || editDescription.value) {
    api.system
      .editRole(roleForm)
      .then((res) => {
        if (res && res.succ != null) {
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
        }
      })
      .catch((error) => {
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
