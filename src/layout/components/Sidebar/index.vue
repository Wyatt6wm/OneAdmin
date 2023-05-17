<template>
  <div>
    <!-- TODO 点击Logo回到首页 -->
    <div class="logo-container">
      <el-avatar :size="logoHeight" shape="square" :src="logoUrl" />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        OneAdmin · 统一管理台
      </h1>
    </div>
    <!-- <el-scrollbar>
      <el-menu :collapse="!$store.getters.sidebarOpened" :default-active="activeMenuPath" :unique-opend="true"
        :background-color="$store.getters.cssVar.menuBg" :text-color="$store.getters.cssVar.menuText"
        :active-text-color="$store.getters.cssVar.menuActiveText" router>
        <sidebar-item v-for="item in menus" :key="item.path" :menu="item"></sidebar-item>
      </el-menu>
    </el-scrollbar> -->
  </div>
</template>

<script setup>
/**
 * 说明：
 * 动态菜单：根据路由表（即动态路由表）的配置，自动生成对应的菜单选项，当路由表发生变化时，菜单自动变化，核心就是路由表和菜单的对应规则
 * 如果要增加菜单项，需要增加路由配置，meta属性中的isMenu设为true，带上meta和icon属性
 */

// import { computed } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
// import { filterRoutes, generateMenus } from '@/utils/routes2menus'
// import SidebarItem from './SidebarItem.vue'

const logoHeight = 44
const logoUrl = require('@/assets/logo.png')

// ---------- 获取（树形结构）菜单数据 ----------
// 由于路由表中有很多路径并不是用来显示菜单的，只是用来跳转用，所以要把真正用来显示菜单的路由筛选出来
// const router = useRouter()
// const menus = computed(() => {
//   const routes = filterRoutes(router.getRoutes()) // getRoutes()返回扁平化的路由，即子路由也被提到第一级了
//   return generateMenus(routes)
// })

// ---------- 默认激活（高亮）的菜单项 ----------
// 通过直接输入URL访问页面或刷新页面时，菜单都能激活对应的菜单项
// const route = useRoute() // 拿到当前路由
// const activeMenuPath = computed(() => {
//   const { path } = route
//   return path // 对应的是v-for里的key的路径
// })
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 20px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 44px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
