<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
/**
 * 说明：
 * 主内容区，具备动画切换的效果，同时带动页面标签栏的动作
 */
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { isViewTag } from '@/utils/common'

const route = useRoute()
const store = useStore()

// 监听主内容区路由变化，如果要添加页面标签则添加
watch(
  route,
  (to, from) => {
    if (!isViewTag(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    const title = to.meta.title
    store.dispatch('viewSettings/addViewTagList', {
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  // 浏览器可视高度=100vh
  min-height: calc(100vh - 50px - 34px);
  width: 100%;
  margin-top: 84px;
  position: relative;
  overflow: hidden;
  padding: 8px 10px 8px 10px;
  box-sizing: border-box;
}
</style>
