<template>
  <div>
    <el-card class="salary-statistic-card">
      <div>
        <el-empty description="统计数据（暂未开放）" />
      </div>
    </el-card>
    <el-tabs type="border-card" class="salary-detail-card" stretch>
      <el-tab-pane label="工资条">
        <salary-bill></salary-bill>
      </el-tab-pane>
      <el-tab-pane label="五险（养老+医疗+失业+工伤+生育）">
        <insurance></insurance>
      </el-tab-pane>
      <el-tab-pane label="人寿 & 泰康 & 穗岁康">
        <div>
          <el-empty description="暂未开放" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="住房公积金">
        <housing-fund></housing-fund>
      </el-tab-pane>
      <el-tab-pane label="企业年金">
        <div>
          <el-empty description="暂未开放" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="工会福利">
        <welfare></welfare>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import SalaryBill from './components/SalaryBill.vue'
import Insurance from './components/Insurance.vue'
import HousingFund from './components/HousingFund.vue'
import Welfare from './components/Welfare.vue'
</script>

<style lang="scss" scoped>
.salary-statistic-card {
  margin-bottom: 6px;
}
</style>
