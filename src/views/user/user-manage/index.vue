<template>
  <div>
    <el-card height="100%">
      <el-table max-height="calc(100vh - 185px)" border :data="userList">
        <el-table-column label="序号" align="center" width="60" type="index"></el-table-column>
        <el-table-column label="头像" align="center" width="100">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.user.avatar"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="用户名" prop="user.username" width="200"></el-table-column>
        <el-table-column label="角色" width="200">
          <template v-slot="{ row }">
            <div v-if="row.roleNames && row.roleNames.length > 0">
              <el-tag v-for="roleName in row.roleNames" size="small">{{ roleName }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="user.nickname" width="200"></el-table-column>
        <el-table-column label="座右铭" prop="user.motto"></el-table-column>
        <el-table-column v-role="[Const.role.SUPER_ADMIN]" label="操作" align="center" width="100">
          <template #default="scope">
            <el-button size="small" type="primary" plain @click="handleBind(scope.row)"> 绑定角色 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- <bind-role :visable="bindRoleVisable" @close="bindRoleDialog"></bind-role> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api'
import { ElMessage } from 'element-plus'
import Const from '@/constant'
// import BindRole from './components/BindRole.vue'

// ----- 获取用户列表渲染表格 -----
const userList = ref([])
const getUserList = async () => {
  userList.value = await api.system
    .getUserList()
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.userList
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })
}
getUserList()

// ----- 角色授权 -----
const grantDialogVisable = ref(false)
const handleBind = (row) => {
  grantDialogVisable.value = true
  user.value = row
}
const closeGrantDialog = () => {
  grantDialogVisable.value = false
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
