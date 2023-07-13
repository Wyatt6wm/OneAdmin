<template>
  <el-card height="100%">
    <div class="button-area">
      <el-button type="primary" @click="router.push('/todo/todo-detail/1')">新建待办</el-button>
    </div>
    <el-table max-height="calc(100vh - 185px)" border>
      <el-table-column label="待办事项" align="center" width="350"></el-table-column>
      <el-table-column label="紧急度" align="center" width="100"></el-table-column>
      <el-table-column label="重要性" align="center" width="100"></el-table-column>
      <el-table-column label="截止时间" align="center" width="200"></el-table-column>
      <el-table-column label="状态" align="center" width="100"></el-table-column>
      <el-table-column label="最新进度" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.button-area {
  text-align: left;
  padding-bottom: 10px;
}
</style>
