<template>
  <div class="tab-box">
    <div class="button-area">
      <el-button type="primary">添加记录</el-button>
      <el-button type="success">导出表格</el-button>
    </div>
    <el-table :data="salaryBillData" stripe height="300">
      <el-table-column label="季度" prop="season"></el-table-column>
      <el-table-column label="月份" prop="month"></el-table-column>
      <el-table-column label="养老保险">
        <el-table-column label="公司缴费" width="85" prop="enterpriseEndowment"></el-table-column>
        <el-table-column label="个人缴费" width="85" prop="individualEndowment"></el-table-column>
        <el-table-column label="合计" prop="endowmentTotal"></el-table-column>
      </el-table-column>
      <el-table-column label="医疗保险">
        <el-table-column label="职工基本医保（公司）" width="110" prop="enterpriseBasicMedical"></el-table-column>
        <el-table-column label="职工基本医保（个人）" width="110" prop="individualBasicMedical"></el-table-column>
        <el-table-column label="大额医疗补助（公司）" width="110" prop="largeMedical"></el-table-column>
        <el-table-column label="企业补充医保（公司）" width="110" prop="extraMedical"></el-table-column>
        <el-table-column label="合计" width="85" prop="medicalTotal"></el-table-column>
      </el-table-column>
      <el-table-column label="失业保险">
        <el-table-column label="公司缴费" width="85" prop="enterpriseUnemployment"></el-table-column>
        <el-table-column label="个人缴费" width="85" prop="individualUnemployment"></el-table-column>
        <el-table-column label="合计" width="85" prop="unemploymentTotal"></el-table-column>
      </el-table-column>
      <el-table-column label="工伤保险（公司）" width="85" prop="injuryInsurance"></el-table-column>
      <el-table-column label="生育保险（公司）" width="85" prop="maternityInsurance"></el-table-column>
      <el-table-column label="备注" width="300" prop="remarks"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default>
          <el-button type="plain" size="small">修改</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const salaryBillData = [
  {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  },
  {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
  }, {
    season: 'Q2',
    month: '2023-04',
    enterpriseEndowment: 2276.4,
    individualEndowment: 1300.8,
    endowmentTotal: 3577.2,
    enterpriseBasicMedical: 1113.81,
    individualBasicMedical: 325.2,
    largeMedical: 0,
    extraMedical: 0,
    medicalTotal: 1439.01,
    enterpriseUnemployment: 52.03,
    individualUnemployment: 32.52,
    unemploymentTotal: 84.55,
    injuryInsurance: 21.46,
    maternityInsurance: 0
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
