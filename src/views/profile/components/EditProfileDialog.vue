<template>
  <el-dialog :model-value="props.visable" title="修改用户信息" @close="onClose">
    <el-form class="edit-profile-form" width="60%" size="large" label-width="60px">
      <el-form-item label="昵称" :model="profileForm">
        <el-input placeholder=" 请输入新的昵称" v-model="profileForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="座右铭">
        <el-input type="textarea" placeholder="请输入您的座右铭" v-model="profileForm.motto"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="large" type="primary" @click="onConfirm" :loading="loading">确定</el-button>
      <el-button size="large" @click="onClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
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
const profileForm = reactive({
  nickname: '',
  motto: ''
})
// 监听打开对话框动作
watch(
  () => props.visable,
  () => {
    if (props.visable) {
      profileForm.nickname = profileForm.motto = ''
    }
  }
)

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 调用父组件close事件
  emits('close')
}

// ----- 点击“确定” -----
const loading = ref(false)
const onConfirm = async () => {
  if ((profileForm.nickname && profileForm.nickname.length > 0) || (profileForm.motto && profileForm.motto.length > 0)) {
    loading.value = true
    profileForm.id = store.getters.profile.id
    await api.user.editProfile(profileForm)
      .then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            ElMessage.success('用户信息修改成功')
            loading.value = false
            onClose()
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
    store.dispatch('userLogin/getProfile')
  } else {
    onClose()
  }
}
</script>

<style lang="scss" scoped>
.edit-profile-form {
  width: 80%;
  margin: auto;
}
</style>
