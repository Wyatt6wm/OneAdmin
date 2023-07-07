<template>
  <div>
    <el-card height="100%">
      <div class="button-area" v-role="[Const.role.SUPER_ADMIN]">
        <el-button type="primary" @click="handleAdd">新增角色</el-button>
      </div>
      <el-table max-height="calc(100vh - 185px)" border :data="roleList">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column label="状态" width="85">
          <template #default="scope">
            <el-tag :type="scope.row.activated ? 'success' : 'warning'">
              {{ scope.row.activated ? '生效' : '未生效' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="角色标识符" prop="identifier" width="200"></el-table-column>
        <el-table-column label="角色名称" prop="name" width="200"></el-table-column>
        <el-table-column label="角色描述" prop="description"></el-table-column>
        <el-table-column v-role="[Const.role.SUPER_ADMIN]" label="角色操作" width="200">
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
    <add-role-dialog :visable="addRoleDialogVisable" @close="closeAddDialog"
      @updateAfterAdd="getRoleList"></add-role-dialog>
    <edit-role-dialog :visable="editRoleDialogVisable" :role="role" @close="closeEditDialog"
      @updateAfterEdit="getRoleList"></edit-role-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import Const from '@/constant'
import EditRoleDialog from './components/EditRoleDialog.vue'
import AddRoleDialog from './components/AddRoleDialog.vue'

// ----- 获取角色列表渲染表格 -----
const roleList = ref([])
const getRoleList = async () => {
  roleList.value = await api.system
    .getRoleList()
    .then((res) => {
      if (res.succ) {
        return res.data.roleList
      } else {
        ElMessage.error(res.mesg)
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
}
getRoleList()

// ----- 新增角色 -----
const addRoleDialogVisable = ref(false)
const handleAdd = () => {
  addRoleDialogVisable.value = true
}
const closeAddDialog = () => {
  addRoleDialogVisable.value = false
}

// ----- 编辑角色 -----
const editRoleDialogVisable = ref(false)
const role = ref({})
const handleEdit = (row) => {
  editRoleDialogVisable.value = true
  role.value = row
}
const closeEditDialog = () => {
  editRoleDialogVisable.value = false
}

// ----- 启用/禁用 -----
const handleChangeStatus = (roleDetail) => {
  const { id, identifier, name, activated } = roleDetail
  const message = '是否' + (activated ? '禁用' : '启用') + '角色【' + identifier + (name ? ' ' + name : '') + '】？'
  ElMessageBox.confirm(message, '请确认', { type: 'warning' }).then(() => {
    const roleForm = { id: id, activated: !activated }
    api.system
      .editRole(roleForm)
      .then((res) => {
        if (res.succ) {
          const succMesg =
            '成功' + (activated ? '禁用' : '启用') + '角色【' + identifier + (name ? ' ' + name : '') + '】'
          roleDetail.activated = !roleDetail.activated
          ElMessage.success(succMesg)
        } else {
          ElMessage.error(res.mesg)
          getRoleList()
        }
      })
      .catch((error) => {
        ElMessage.error(error.message)
      })
  }).catch((error) => {
    console.log(error)
  })
}

// ----- 删除角色 -----
const handleDelete = (roleDetail) => {
  const { id, identifier, name } = roleDetail
  const message = '是否删除角色【' + identifier + (name ? ' ' + name : '') + '】？'
  ElMessageBox.confirm(message, '请确认', { type: 'warning' }).then(() => {
    api.system.removeRole(id).then((res) => {
      if (res.succ) {
        const succMesg = '成功删除角色【' + identifier + (name ? ' ' + name : '') + '】'
        ElMessage.success(succMesg)
      } else {
        ElMessage.error(res.mesg)
      }
      getRoleList()
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
