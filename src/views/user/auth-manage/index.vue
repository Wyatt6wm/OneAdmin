<template>
  <el-card height="100%">
    <el-table border :data="authDetails">
      <el-table-column label="序号" width="70" type="index"></el-table-column>
      <el-table-column label="状态" width="90">
        <template #default="scope">
          <el-tag :type="scope.row.activated ? 'success' : 'warning'">
            {{ scope.row.activated ? '生效' : '未生效' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权限标识符" prop="identifier"></el-table-column>
      <el-table-column label="权限名称" prop="name"></el-table-column>
      <el-table-column label="权限描述" prop="description"></el-table-column>
      <el-table-column label="权限操作" width="200">
        <template #default="scope">
          <el-button size="small" plain @click="handleEdit(scope.row)">
            修改
          </el-button>
          <el-button
            size="small"
            :type="scope.row.activated ? 'warning' : 'success'"
            plain
            @click="handleChangeStatus(scope.row)"
          >
            {{ scope.row.activated ? '禁用' : '启用' }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'

// ----- 获取权限详细列表渲染表格 -----
const authDetails = ref([])
const getAuthDetails = async () => {
  authDetails.value = await api.system
    .getAuthDetails()
    .then((res) => {
      if (res.succ) {
        return res.data.authDetails
      } else {
        ElMessage.error(res.mesg)
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
}
getAuthDetails()

// ----- 修改权限 -----
const handleEdit = (authDetail) => {}

// ----- 切换状态 -----
const handleChangeStatus = (authDetail) => {
  const message =
    '是否' +
    (authDetail.activated ? '禁用' : '启用') +
    '权限【' +
    authDetail.identifier +
    ' ' +
    authDetail.name +
    '】？'
  ElMessageBox.confirm(message, '确认').then(() => {
    const authForm = { id: authDetail.id, activated: !authDetail.activated }
    api.system
      .editAuth(authForm)
      .then((res) => {
        if (res.succ) {
          const succMesg =
            '成功' +
            (authDetail.activated ? '禁用' : '启用') +
            '权限【' +
            authDetail.identifier +
            ' ' +
            authDetail.name +
            '】'
          authDetail.activated = !authDetail.activated
          ElMessage.success(succMesg)
        } else {
          ElMessage.error(res.mesg)
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  })
}

// ----- 删除权限 -----
const handleDelete = (authDetail) => {}
</script>
