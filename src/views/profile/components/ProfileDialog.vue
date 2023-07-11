<template>
  <el-dialog :model-value="props.visable" title="修改用户信息" @close="onClose">
    <el-form>
      <el-form-item label="昵称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="座右铭">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visable: {
    type: Boolean,
    default: false,
    required: true
  }
})
const emits = defineEmits(['close'])

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 调用父组件close事件
  emits('close')
}
</script>