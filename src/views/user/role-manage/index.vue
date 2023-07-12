<template>
  <div>
    <el-card height="100%">
      <div class="button-area" v-role="[Const.role.SUPER_ADMIN]">
        <el-button type="primary" @click="addRoleDialogVisable = true">新增角色</el-button>
      </div>
      <el-table max-height="calc(100vh - 185px)" border :data="roleManageList">
        <el-table-column label="序号" align="center" width="60" type="index"></el-table-column>
        <el-table-column label="状态" align="center" width="85">
          <template #default="scope">
            <el-tag :type="scope.row.activated ? 'success' : 'warning'">
              {{ scope.row.activated ? '生效' : '未生效' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色标识符" prop="identifier" width="200"></el-table-column>
        <el-table-column label="角色名称" prop="name" width="200"></el-table-column>
        <el-table-column label="角色描述" prop="description"></el-table-column>
        <el-table-column v-role="[Const.role.SUPER_ADMIN]" label="角色操作" align="center" width="280">
          <template #default="scope">
            <el-button size="small" type="primary" plain @click="handleGrant(scope.row)"> 查看授权 </el-button>
            <el-button size="small" plain @click="handleEdit(scope.row)"> 修改 </el-button>
            <el-button size="small" :type="scope.row.activated ? 'warning' : 'success'" plain
              @click="handleChangeStatus(scope.row)">
              {{ scope.row.activated ? '禁用' : '启用' }}
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add-role-dialog :visable="addRoleDialogVisable" @close="addRoleDialogVisable = false"
      @updateAfterAdd="getRoleManageList"></add-role-dialog>
    <edit-role-dialog :visable="editRoleDialogVisable" :role="role" @close="editRoleDialogVisable = false"
      @updateAfterEdit="getRoleManageList"></edit-role-dialog>
    <grant-dialog :visable="grantDialogVisable" :role="role" @close="grantDialogVisable = false"></grant-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import Const from '@/constant'
import EditRoleDialog from './components/EditRoleDialog.vue'
import AddRoleDialog from './components/AddRoleDialog.vue'
import GrantDialog from './components/GrantDialog.vue'

// ----- 获取角色列表渲染表格 -----
const roleManageList = ref([])
const getRoleManageList = async () => {
  roleManageList.value = await api.system
    .getRoleManageList()
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
}
getRoleManageList()

// ----- 新增角色 -----
const addRoleDialogVisable = ref(false)

// ----- 编辑角色 -----
const editRoleDialogVisable = ref(false)
const role = ref({})
const handleEdit = (row) => {
  editRoleDialogVisable.value = true
  role.value = row
}

// ----- 角色授权 -----
const grantDialogVisable = ref(false)
const handleGrant = (row) => {
  grantDialogVisable.value = true
  role.value = row
}

// ----- 启用/禁用 -----
const handleChangeStatus = (roleDetail) => {
  const { id, identifier, name, activated } = roleDetail
  const message = '是否' + (activated ? '禁用' : '启用') + '角色【' + identifier + (name ? ' / ' + name : '') + '】？'
  ElMessageBox.confirm(message, '请确认', { type: 'warning' })
    .then(() => {
      const roleForm = { id: id, activated: !activated }
      api.system
        .editRole(roleForm)
        .then((res) => {
          if (res && res.succ != null) {
            if (res.succ) {
              const succMesg = '成功' + (activated ? '禁用' : '启用') + '角色【' + identifier + (name ? ' / ' + name : '') + '】'
              roleDetail.activated = !roleDetail.activated
              ElMessage.success(succMesg)
            } else {
              ElMessage.error(res.mesg)
              getRoleManageList()
            }
          }
        })
        .catch((error) => {
          ElMessage.error(error.message)
        })
    })
    .catch(() => {
      // 点击“取消”不做动作
    })
}

// ----- 删除角色 -----
const handleDelete = (roleDetail) => {
  const { id, identifier, name } = roleDetail
  const message = '是否删除角色【' + identifier + (name ? ' / ' + name : '') + '】？'
  ElMessageBox.confirm(message, '请确认', { type: 'warning' })
    .then(() => {
      api.system
        .removeRole(id)
        .then((res) => {
          if (res && res.succ != null) {
            if (res.succ) {
              const succMesg = '成功删除角色【' + identifier + (name ? ' / ' + name : '') + '】'
              ElMessage.success(succMesg)
            } else {
              ElMessage.error(res.mesg)
            }
            getRoleManageList()
          }
        })
        .catch((error) => {
          ElMessage.error(error.message)
        })
    })
    .catch(() => {
      // 点击“取消”不做动作
    })
}
</script>

<style lang="scss" scoped>
.button-area {
  text-align: left;
  padding-bottom: 10px;
}
</style>
