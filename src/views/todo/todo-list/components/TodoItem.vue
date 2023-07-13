<template>
  <el-card height="100%">
    <div class="button-area">
      <span class="back">
        <el-icon :size="25">
          <Back />
        </el-icon>
      </span>
    </div>
  </el-card>
</template>

<script setup></script>

<style lang="scss" scoped>
.button-area {
  text-align: left;
  padding-bottom: 10px;

  .back {
    cursor: pointer;
  }
}
</style>
