<template>
  <el-dialog :model-value="props.visable" title="新增角色" @close="onClose()">
    <el-form :model="roleForm" ref="roleFormRef" :rules="roleRules" label-width="100px" label-position="right">
      <el-form-item label="角色标识符" prop="identifier">
        <el-input :placeholder="identifierPlaceholder" v-model="roleForm.identifier" clearable />
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input :placeholder="namePlaceholder" v-model="roleForm.name" clearable />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input :placeholder="descriptionPlaceholder" v-model="roleForm.description" type="textarea" />
      </el-form-item>
      <el-form-item label="是否立即生效">
        <el-switch v-model="roleForm.activated"></el-switch>
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
const identifierPlaceholder = ref('请输入角色标识符，格式如：super_admin、admin等')
const namePlaceholder = ref('请输入角色名称')
const descriptionPlaceholder = ref('请输入角色描述')
// 提交的表单
const roleForm = reactive({
  identifier: '',
  name: '',
  description: '',
  activated: false
})
// 校验规则
const roleRules = ref({
  identifier: [
    {
      required: true,
      trigger: 'blur', // 移开光标时
      message: '请输入角色标识符'
    }
  ]
})

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 还原初始值
  roleForm.identifier = roleForm.name = roleForm.description = ''
  roleForm.activated = false
  // 调用父组件close事件
  emits('close')
}

// ----- 点击“确定” -----
const loading = ref(false)
const roleFormRef = ref(null) // 绑定上面声明了ref="roleFormRef"的<el-form>的实例
const onConfirm = () => {
  roleFormRef.value.validate((pass) => {
    if (!pass) return

    loading.value = true
    api.system.addRole(roleForm).then((res) => {
      if (res.succ) {
        ElMessage.success('角色新建成功')
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
