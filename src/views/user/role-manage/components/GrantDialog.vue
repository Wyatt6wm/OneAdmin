<template>
  <el-dialog width="70%" :model-value="props.visable" :title="title" @close="onClose()">
    <el-transfer :data="allGrants" v-model="granted" :titles="['未授权', '已授权']" :button-texts="['移除', '选择']"
      target-order="unshift" filterable @change="handleChange">
      <template #default="{ option }">
        <span :style="getFontColor(option.key)">
          {{ option.label }}
        </span>
      </template>
    </el-transfer>
    <template #footer>
      <el-button type="primary" @click="onConfirm()" :loading="loading">变更授权</el-button>
      <el-button @click="onClose()">取消</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
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
const emits = defineEmits(['close'])

// ----- 初始化 -----
// 标题
const title = ref('')
// 数据表单
const allGrants = ref([])
const granted = ref([])
const position = ref({})
const initData = async () => {
  // Vue Transfer穿梭框组件的大坑：
  // 左边（data属性）应该用全量数据渲染，类型是对象 { key, label }
  // 右边（v-model属性）的渲染是基于左边的，是一个 key 组成的数组而已，并不是对象

  // 清空
  allGrants.value.length = 0
  granted.value.length = 0
  position.value = {}

  const allGrantsList = await api.system
    .getAuthList()
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.authList
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
  if (allGrantsList && allGrantsList instanceof Array) {
    for (let i = 0; i < allGrantsList.length; i++) {
      const item = allGrantsList[i]
      allGrants.value.push({
        key: item.id,
        label: (item.name ? item.name + ' / ' : '') + item.identifier
      })
      // 默认位置在左边
      position.value[item.id] = {
        origin: 0,
        now: 0
      }
    }
  }

  const grantedList = await api.system
    .getRoleAuths(props.role.id)
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.authList
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
  if (grantedList && grantedList instanceof Array) {
    for (let i = 0; i < grantedList.length; i++) {
      const item = grantedList[i]
      granted.value.push(item.id)
      // 默认位置在右边
      position.value[item.id] = {
        origin: 1,
        now: 1
      }
    }
  }
}
// 监听打开对话框动作
watch(
  () => props.visable,
  () => {
    if (props.visable) {
      title.value = '角色【' + props.role.identifier + (props.role.name ? ' / ' + props.role.name : '') + '】的权限'
      initData()
    }
  }
)
console.log(watch)

// ----- 渲染字体颜色 -----
const getFontColor = (key) => {
  const { origin, now } = position.value[key]
  if (now - origin === 0) return ''
  return 'color: ' + (now - origin > 0 ? '#67C23A' : '#F56C6C')
}

// ----- 权限左右穿梭 -----
const handleChange = (rightKeys) => {
  // 更新所有选项的位置
  for (let i = 0; i < allGrants.value.length; i++) {
    const key = allGrants.value[i].key
    position.value[key].now = 0
  }
  for (let i = 0; i < rightKeys.length; i++) {
    position.value[rightKeys[i]].now = 1
  }
}

// ----- 点击“关闭”或关闭对话框 -----
const onClose = () => {
  // 调用父组件close事件
  emits('close')
}

// ----- 点击“确定” -----
const loading = ref(false)
const onConfirm = () => {
  loading.value = true

  // 要授权的authId列表
  const grantList = []
  for (let i = 0; i < allGrants.value.length; i++) {
    const key = allGrants.value[i].key
    const { origin, now } = position.value[key]
    if (now - origin > 0) {
      grantList.push(key)
    }
  }
  // 要解除授权的authId列表
  const disgrantList = []
  for (let i = 0; i < allGrants.value.length; i++) {
    const key = allGrants.value[i].key
    const { origin, now } = position.value[key]
    if (now - origin < 0) {
      disgrantList.push(key)
    }
  }

  if (grantList.length + disgrantList.length > 0) {
    api.system.changeRoleGrants({ roleId: props.role.id, grantList, disgrantList })
      .then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            const failGrantCnt = res.data.failGrant.length
            const failDisgrantCnt = res.data.failDisgrant.length
            if (failGrantCnt + failDisgrantCnt > 0) {
              const grantSum = grantList.length
              const disgrantSum = disgrantList.length
              ElMessage.warning('授权' + (grantSum - failGrantCnt) + '/' + grantSum + '解除授权' + (disgrantSum - failDisgrantCnt) + '/' + disgrantSum)
              loading.value = false
            } else {
              ElMessage.success('授权变更成功')
              loading.value = false
              onClose()
            }
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
    ElMessage.warning('授权未变更')
    loading.value = false
  }
}
</script>

<style lang="scss">
.el-dialog .el-dialog__body {
  text-align: center;
}

.el-transfer {
  --el-transfer-panel-width: 35%;
}
</style>
