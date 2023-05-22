<template>
  <div class="tab-box">
    <div class="button-area">
      <el-button type="primary">添加记录</el-button>
      <el-button type="success">导出表格</el-button>
    </div>
    <el-table :data="salaryBillData" stripe height="300">
      <el-table-column label="发放日期" width="95" prop="date"></el-table-column>
      <el-table-column label="季度" width="85" prop="season"></el-table-column>
      <el-table-column label="月份" width="85" prop="month"></el-table-column>
      <el-table-column label="职级" width="85" prop="rank"></el-table-column>
      <el-table-column label="发放项目">
        <el-table-column label="基本工资" width="85" prop="basicSalary"></el-table-column>
        <el-table-column label="绩效工资" width="85" prop="meritPay"></el-table-column>
        <el-table-column label="交通补贴" width="85" prop="trafficSubsidy"></el-table-column>
        <el-table-column label="值班补贴" width="85" prop="dutySubsidy"></el-table-column>
        <el-table-column label="补发补扣" width="85" prop="backPay"></el-table-column>
        <el-table-column label="奖金" width="85" prop="bonus"></el-table-column>
        <el-table-column label="发放总额" width="85" prop="total"></el-table-column>
      </el-table-column>
      <el-table-column label="代扣项目">
        <el-table-column label="伙食费" width="85" prop="mealFee"></el-table-column>
        <el-table-column label="工会费" width="85" prop="unionFee"></el-table-column>
        <el-table-column label="互助金" width="85" prop="mutualFund"></el-table-column>
        <el-table-column label="养老保险" width="85" prop="endowmentInsurance"></el-table-column>
        <el-table-column label="医疗保险" width="85" prop="medicalInsurance"></el-table-column>
        <el-table-column label="失业保险" width="85" prop="unemploymentInsurance"></el-table-column>
        <el-table-column label="公积金" width="85" prop="housingFund"></el-table-column>
        <el-table-column label="企业年金" width="85" prop="annuity"></el-table-column>
        <el-table-column label="个税" width="85" prop="incomeTax"></el-table-column>
        <el-table-column label="其他" width="85" prop="other"></el-table-column>
        <el-table-column label="代扣小计" width="85" prop="deduction"></el-table-column>
      </el-table-column>
      <el-table-column label="实发工资" width="85" prop="actualPaid"></el-table-column>
      <el-table-column label="备注" width="350" prop="remarks"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default>
          <el-button type="plain" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class='pagination-box'>
      <el-pagination background layout="total, sizes, prev, pager, next,jumper" :total="1000"
        :page-sizes="[100, 200, 300, 400]" />
    </div>
  </div>
</template>

<script setup>
const salaryBillData = [
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  },
  {
    date: '2023-04-11',
    season: 'Q2',
    month: '2023-04',
    rank: '初级',
    basicSalary: 5569,
    meritPay: 7438,
    trafficSubsidy: 300,
    dutySubsidy: 0,
    backPay: 0,
    bonus: 0,
    total: 13307,
    mealFee: 160,
    unionFee: 27.85,
    mutualFund: 10,
    endowmentInsurance: 1300.8,
    medicalInsurance: 325.2,
    unemploymentInsurance: 32.52,
    housingFund: 1951,
    annuity: 10,
    incomeTax: 140.63,
    other: 0,
    deduction: 3958,
    actualPaid: 9349
  }
]
</script>

<style lang="scss" scoped>
.tab-box {
  .button-area {
    text-align: right;
    padding-bottom: 10px;
  }

  .pagination-box {
    margin-top: 20px;
    margin-bottom: 10px;
  }
}
</style>
