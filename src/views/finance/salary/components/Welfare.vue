<template>
  <div class="tab-box">
    <div class="button-area">
      <el-button type="primary">添加记录</el-button>
      <el-button type="success">导出表格</el-button>
    </div>
    <el-table :data="welfareData" stripe height="300">
      <el-table-column label="发放年份" prop="year"></el-table-column>
      <el-table-column label="项目" prop="name"></el-table-column>
      <el-table-column label="供货厂商" prop="company"></el-table-column>
      <el-table-column label="发放类型" prop="type"></el-table-column>
      <el-table-column label="价值" prop="value"></el-table-column>
      <el-table-column label="操作">
        <template #default>
          <el-button type="plain" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const welfareData = [
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  },
  {
    year: 2023,
    name: '清明、五一慰问',
    company: '东方福利',
    type: '虚拟币',
    value: 660
  }
]
</script>

<style lang="scss" scoped>
.tab-box {
  .button-area {
    text-align: right;
    padding-bottom: 10px;
  }
}
</style>
