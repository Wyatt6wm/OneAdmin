<template>
  <div>
    <el-card>
      <template #header>
        <div>
          <span>收支数据</span>
        </div>
      </template>
    </el-card>
    <el-card class="journal-book">
      <el-table>
        <el-table-column label="日期"></el-table-column>
        <el-table-column label="收支类型"></el-table-column>
        <el-table-column label="贷方"></el-table-column>
        <el-table-column label="借方"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.journal-book {
  margin-top: 6px;
}
</style>
