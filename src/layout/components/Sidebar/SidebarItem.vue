<template>
  <el-sub-menu v-if="menu.children.length > 0" :index="menu.path">
    <template #title>
      <menu-item :title="menu.meta.title" :icon="menu.meta.icon"></menu-item>
    </template>
    <sidebar-item v-for="item in menu.children" :key="item.path" :menu="item"></sidebar-item>
  </el-sub-menu>
  <el-menu-item v-else :index="menu.path">
    <menu-item :title="menu.meta.title" :icon="menu.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
/**
 * 说明：
 * 侧边栏菜单组件，接受菜单数组menus的元素menu对象作为输入
 * 如果当前菜单有子菜单就用<el-sub-menu>
 * 如果没有子菜单，就用<el-menu-item>
 * 注意<el-submenu>是旧版本^1.0.2-beta.28的标签了
 */

import { defineProps } from 'vue'
import MenuItem from './MenuItem.vue'

defineProps({
  menu: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
