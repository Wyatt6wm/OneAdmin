<template>
  <div>
    <el-card height="100%">
      <div class="button-area" v-role="[Const.role.SUPER_ADMIN]">
        <el-button type="primary" @click="handleAdd">新增权限</el-button>
      </div>
      <el-table max-height="calc(100vh - 185px)" border :data="authList">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column label="状态" width="85">
          <template #default="scope">
            <el-tag :type="scope.row.activated ? 'success' : 'warning'">
              {{ scope.row.activated ? '生效' : '未生效' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限标识符" prop="identifier"></el-table-column>
        <el-table-column label="权限名称" prop="name"></el-table-column>
        <el-table-column label="权限描述" prop="description"></el-table-column>
        <el-table-column v-role="[Const.role.SUPER_ADMIN]" label="权限操作" width="200">
          <template #default="scope">
            <el-button size="small" plain @click="handleEdit(scope.row)">
              修改
            </el-button>
            <el-button size="small" :type="scope.row.activated ? 'warning' : 'success'" plain
              @click="handleChangeStatus(scope.row)">
              {{ scope.row.activated ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-auth-dialog :visable="addAuthDialogVisable" @close="closeAddDialog"
      @updateAfterAdd="getAuthList"></add-auth-dialog>
    <edit-auth-dialog :visable="editAuthDialogVisable" :auth="auth" @close="closeEditDialog"
      @updateAfterEdit="getAuthList"></edit-auth-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import Const from '@/constant'
import EditAuthDialog from './components/EditAuthDialog.vue'
import AddAuthDialog from './components/AddAuthDialog.vue'

// ----- 获取权限列表渲染表格 -----
const authList = ref([])
const getAuthList = async () => {
  authList.value = await api.system
    .getAuthList()
    .then((res) => {
      if (res.succ) {
        return res.data.authList
      } else {
        ElMessage.error(res.mesg)
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
}
getAuthList()

// ----- 新增权限 -----
const addAuthDialogVisable = ref(false)
const handleAdd = () => {
  addAuthDialogVisable.value = true
}
const closeAddDialog = () => {
  addAuthDialogVisable.value = false
}

// ----- 编辑权限 -----
const editAuthDialogVisable = ref(false)
const auth = ref({})
const handleEdit = (row) => {
  editAuthDialogVisable.value = true
  auth.value = row
}
const closeEditDialog = () => {
  editAuthDialogVisable.value = false
}

// ----- 启用/禁用 -----
const handleChangeStatus = (authDetail) => {
  const { id, identifier, name, activated } = authDetail
  const message = '是否' + (activated ? '禁用' : '启用') + '权限【' + identifier + (name ? ' ' + name : '') + '】？'
  ElMessageBox.confirm(message, '请确认', { type: 'warning' }).then(() => {
    const authForm = { id: id, activated: !activated }
    api.system
      .editAuth(authForm)
      .then((res) => {
        if (res.succ) {
          const succMesg =
            '成功' + (activated ? '禁用' : '启用') + '权限【' + identifier + (name ? ' ' + name : '') + '】'
          authDetail.activated = !authDetail.activated
          ElMessage.success(succMesg)
        } else {
          ElMessage.error(res.mesg)
          getAuthList()
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  }).catch((error) => {
    console.log(error)
  })
}

// ----- 删除权限 -----
const handleDelete = (authDetail) => {
  const { id, identifier, name } = authDetail
  const message = '是否删除权限【' + identifier + (name ? ' ' + name : '') + '】？'
  ElMessageBox.confirm(message, '请确认', { type: 'warning' }).then(() => {
    api.system.removeAuth(id).then((res) => {
      if (res.succ) {
        const succMesg = '成功删除权限【' + identifier + (name ? ' ' + name : '') + '】'
        ElMessage.success(succMesg)
      } else {
        ElMessage.error(res.mesg)
      }
      getAuthList()
    }).catch((error) => {
      ElMessage.error(error.message)
    })
  }).catch((error) => {
    console.log(error)
  })
}
</script>

<style lang="scss" scoped>
.button-area {
  text-align: left;
  padding-bottom: 10px;
}
</style>
