<template>
  <el-dialog :model-value="props.visable" title="新增进度" @close="onClose()" draggable>
    <el-form :model="form" ref="formRef" :rules="rules" label-width="70px" label-position="right">
      <el-form-item label="标题" prop="title" required>
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="进度内容" prop="log">
        <el-input type="textarea" :rows="5" v-model="form.log" />
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
import { STATUS } from '../../utils/status'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
  visable: {
    type: Boolean,
    default: false,
    required: true
  },
  todoId: {
    type: Number,
    default: 0,
    required: true
  }
})
const emits = defineEmits(['close', 'render'])

// 提交的表单
const formRef = ref(null)
const form = reactive({
  todoId: 0,
  title: '',
  log: ''
})
const rules = ref({
  title: [{ required: true, message: '请输入进度跟踪记录的标题' }]
})

// ----- 初始化 -----
// 监听打开对话框动作
watch(
  () => props.visable === true,
  () => {
    if (props.visable) {
      // 还原初始值
      if (formRef.value != null) {
        formRef.value.resetFields()
      }
    }
  }
)

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 还原初始值
  if (formRef.value != null) {
    formRef.value.resetFields()
  }
  // 调用父组件close事件
  emits('close')
}

// ----- 点击“确定” -----
const loading = ref(false)
const onConfirm = () => {
  formRef.value.validate((pass) => {
    if (!pass) return
    loading.value = true
    form.todoId = props.todoId
    api.todo.addTodoLog(form)
      .then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            ElMessage.success('成功新增进度记录')
            emits('render', res.data)
            emits('close')
          } else {
            ElMessage.error(res.mesg)
          }
        }
      }).catch((error) => {
        ElMessage.error(error.message)
      })
    loading.value = false
  })
}
</script>

<style lang="scss"></style>
