<template>
  <el-dialog :model-value="props.visable" :title="title" @close="onClose()" draggable>
    <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
      <el-form-item :label="label" prop="conclusion">
        <el-input type="textarea" :rows="5" v-model="form.conclusion" />
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
  todoUuid: {
    type: String,
    default: '',
    required: true
  },
  type: {
    type: String,
    default: STATUS.FINISH,
    required: true
  }
})
const emits = defineEmits(['close', 'render'])

const title = ref('完成待办')
const label = ref('完成结论')
// 提交的表单
const formRef = ref(null)
const form = reactive({
  uuid: 0,
  conclusion: '未填写完成结论'
})
// 校验规则
const rules = ref({
  conclusion: [
    {
      required: true,
      trigger: 'blur', // 移开光标时
      message: '请输入待办完成结论'
    }
  ]
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
      if (props.type === STATUS.CANCEL) {
        title.value = '取消待办'
        label.value = '取消原因'
        form.conclusion = '未填写取消原因'
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
    form.uuid = props.todoUuid
    if (props.type === STATUS.FINISH) {
      ElMessageBox.confirm('是否完成待办？完成后待办将冻结。', '请确认')
        .then(async () => {
          api.todo.finishTodo(form).then((res) => {
            if (res && res.succ != null) {
              if (res.succ) {
                ElMessage.success('待办已完成')
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
        .catch(() => {
          // 点击“取消”不做动作
        })
    } else {
      ElMessageBox.confirm('是否取消待办？取消后待办将冻结。', '请确认')
        .then(async () => {
          api.todo.cancelTodo(form).then((res) => {
            if (res && res.succ != null) {
              if (res.succ) {
                ElMessage.success('待办已取消')
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
        .catch(() => {
          // 点击“取消”不做动作
        })
    }
    loading.value = false
  })
}
</script>

<style lang="scss"></style>
