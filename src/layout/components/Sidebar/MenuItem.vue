<template>
  <div v-if="icon">
    <el-icon v-if="icon.includes('el-icon')" class="sub-el-icon" :size="15">
      <component :is="icon.substring(8, icon.length)"></component>
    </el-icon>
    <svg-icon v-else :icon="icon"></svg-icon>
  </div>
  <span>{{ title }}</span>
</template>

<script setup>
/**
 * 说明：
 * 支持使用ElementPlus图标或本地/外部图标
 * title：菜单标题，String，必填
 * icon：图标名称，String，选填，ElementPlus图标以el-icon-前缀开头
 */
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  }
})
</script>

<style lang="scss" scoped></style>
