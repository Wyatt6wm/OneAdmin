<template>
  <div class="tab-box">
    <div class="button-area">
      <el-button type="primary">添加记录</el-button>
      <el-button type="success">导出表格</el-button>
    </div>
    <el-table :data="housingFundData" stripe height="300">
      <el-table-column label="记账日期" prop="date"></el-table-column>
      <el-table-column label="缴存月份" prop="month"></el-table-column>
      <el-table-column label="个人缴存金额" prop="individualDeposit"></el-table-column>
      <el-table-column label="企业缴存金额" prop="enterpriseDeposit"></el-table-column>
      <el-table-column label="总缴存金额" prop="totalDeposit"></el-table-column>
      <el-table-column label="结息" prop="interest"></el-table-column>
      <el-table-column label="提取" prop="withdraw"></el-table-column>
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
const housingFundData = [
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
  },
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
  },
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
  },
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
  },
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
  },
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
  },
  {
    date: '2023-04-12',
    month: '2023-04',
    individualDeposit: 1951,
    enterpriseDeposit: 1951,
    totalDeposit: 3902,
    interest: 0,
    withdraw: 0
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
