<template>
  <el-tabs type="border-card" class="salary-detail-card" stretch>
    <el-tab-pane label="工资条">
      <salary-bill></salary-bill>
    </el-tab-pane>
    <el-tab-pane label="五险">
      <insurance></insurance>
    </el-tab-pane>
    <el-tab-pane label="商业险（人寿，泰康，穗岁康）">
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
</template>

<script setup>
import SalaryBill from './components/SalaryBill.vue'
import Insurance from './components/Insurance.vue'
import HousingFund from './components/HousingFund.vue'
import Welfare from './components/Welfare.vue'
</script>

<style lang="scss" scoped></style>
