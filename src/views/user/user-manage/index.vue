<template>
  <div>
    <el-card height="100%">
      <el-table max-height="calc(100vh - 185px)" border :data="userManageList">
        <el-table-column label="序号" align="center" width="60" type="index"></el-table-column>
        <el-table-column label="头像" align="center" width="100">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.user.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="user.username" width="200"></el-table-column>
        <el-table-column label="角色" width="200">
          <template v-slot="{ row }">
            <div v-if="row.roles && row.roles.length > 0">
              <el-space wrap>
                <el-tag v-for="item in row.roles" :key="item.id" size="small"
                  :type="item.activated ? 'success' : 'warning'">{{ item.name }}</el-tag>
              </el-space>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="user.nickname" width="200"></el-table-column>
        <el-table-column label="座右铭" prop="user.motto"></el-table-column>
        <el-table-column v-role="[Const.role.SUPER_ADMIN]" label="操作" align="center" width="100">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleBind(scope.row)">绑定角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <bind-role-dialog :visable="bindRoleDialogVisable" :user="user" @close="bindRoleDialogVisable = false"
      @updateAfterBind="getUserManageList"></bind-role-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage } from 'element-plus'
import Const from '@/constant'
import BindRoleDialog from './components/BindRoleDialog.vue'

// ----- 获取用户列表渲染表格 -----
const userManageList = ref([])
const getUserManageList = async () => {
  userManageList.value = await api.user
    .getUserManageList()
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.userManageList
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
}
getUserManageList()

// ----- 绑定角色 -----
const bindRoleDialogVisable = ref(false)
const user = ref({})
const handleBind = (row) => {
  bindRoleDialogVisable.value = true
  user.value = row.user
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
