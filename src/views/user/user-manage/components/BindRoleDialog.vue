<template>
  <el-dialog width="70%" :model-value="props.visable" :title="title" @close="onClose()">
    <el-transfer :data="baseList" v-model="rightKeys" :titles="['未绑定', '已绑定']" :button-texts="['移除', '选择']"
      target-order="unshift" filterable @change="handleChange">
      <template #default="{ option }">
        <span :style="getFontColor(option.key, option.activated)">
          <div v-if="option.activated">
            {{ option.label }}
          </div>
          <div v-else>
            <i>{{ '(未启用)' + option.label }}</i>
          </div>
        </span>
      </template>
    </el-transfer>
    <template #footer>
      <el-button type="primary" @click="onConfirm()" :loading="loading">变更绑定</el-button>
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
  user: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['close'])

// ----- 初始化 -----
// 标题
const title = ref('')
// 数据表单
const baseList = ref([])
const rightKeys = ref([])
const position = ref({})
const initData = async () => {
  // Vue Transfer穿梭框组件的大坑：
  // 左边（data属性）应该用全量数据渲染，类型是对象 { key, label }
  // 右边（v-model属性）的渲染是基于左边的，是一个 key 组成的数组而已，并不是对象

  // 清空
  baseList.value.length = 0
  rightKeys.value.length = 0
  position.value = {}

  const roles = await api.system
    .getRoleManageList()  // 借用/getRoleManageList接口
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.roleManageList
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
  if (roles && roles instanceof Array) {
    for (let i = 0; i < roles.length; i++) {
      const item = roles[i]
      baseList.value.push({
        key: item.id,
        label: (item.name ? item.name + ' / ' : '') + item.identifier,
        activated: item.activated
      })
      // 默认位置在左边
      position.value[item.id] = {
        origin: 0,
        now: 0
      }
    }
  }

  const rolesOfUser = await api.system
    .getRolesOfUser(props.user.id)
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.roles
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
  if (rolesOfUser && rolesOfUser instanceof Array) {
    for (let i = 0; i < rolesOfUser.length; i++) {
      const item = rolesOfUser[i]
      rightKeys.value.push(item.id)
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
      title.value = '用户【' + props.user.username + (props.user.nickname ? ' / ' + props.user.nickname : '') + '】的角色'
      initData()
      loading.value = false
    }
  }
)

// ----- 渲染字体颜色 -----
const getFontColor = (key, activated) => {
  const { origin, now } = position.value[key]
  if (now - origin === 0) {
    return activated ? '' : 'color: #C0C4CC'
  }
  return 'color: ' + (now - origin > 0 ? '#67C23A' : '#F56C6C')
}

// ----- 权限左右穿梭 -----
const handleChange = (rightKeys) => {
  // 更新所有选项的位置
  for (let i = 0; i < baseList.value.length; i++) {
    const key = baseList.value[i].key
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

  // 要绑定的roleId列表
  const bindList = []
  for (let i = 0; i < baseList.value.length; i++) {
    const key = baseList.value[i].key
    const { origin, now } = position.value[key]
    if (now - origin > 0) {
      bindList.push(key)
    }
  }
  // 要解除绑定的roleId列表
  const unbindList = []
  for (let i = 0; i < baseList.value.length; i++) {
    const key = baseList.value[i].key
    const { origin, now } = position.value[key]
    if (now - origin < 0) {
      unbindList.push(key)
    }
  }

  if (bindList.length + unbindList.length > 0) {
    api.system.changeBinds({ userId: props.user.id, bindList, unbindList })
      .then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            const failBindCnt = res.data.failBind.length
            const failUnbindCnt = res.data.failUnbind.length
            if (failBindCnt + failUnbindCnt > 0) {
              const bindSum = bindList.length
              const unbindSum = unbindList.length
              ElMessage.warning('绑定' + (bindSum - failBindCnt) + '/' + bindSum + '解除绑定' + (unbindSum - failUnbindCnt) + '/' + unbindSum)
              loading.value = false
            } else {
              ElMessage.success('绑定变更成功')
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
    ElMessage.warning('绑定未变更')
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.el-transfer {
  --el-transfer-panel-width: 35%;
}
</style>
