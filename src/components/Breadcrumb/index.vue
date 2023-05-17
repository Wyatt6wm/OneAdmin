<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">{{
          item.meta.title
        }}</span>
        <span class="redirect" v-else @click="onLinkClick(item)">{{
          item.meta.title
        }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
/**
 * 说明：
 * 面包屑组件，路由表路径中满足meta && meta.isBreadcrumb && meta.title的才会被显示出来
 * 除了最后一个的面包屑不可点击，前面的其他面包屑都支持点击跳转
 */
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { isEmpty } from '@/utils/common'

const route = useRoute()

// 获取面包屑的渲染数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  // route.matched为当前路由在路由表中从根节点往下匹配的路径上的路由节点组成的数组
  breadcrumbData.value = route.matched.filter(
    (item) => !isEmpty(item.meta) && item.meta.isBreadcrumb && item.meta.title
  )
}

// 监听路由变化
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true // 变化立即响应
  }
)

// 点击跳转
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 面包屑鼠标悬浮颜色同菜单颜色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #b1b9c4;
    cursor: text;
  }

  .redirect {
    color: #868686;
    font-weight: 400;
    cursor: pointer;
  }

  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
}
</style>
