<template>
  <div class="hamburger-container" @click="toggle">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
/**
 * 说明：
 * 放在顶部导航栏左侧的菜单栏伸缩按钮
 */
import { computed } from 'vue'
import { useStore } from 'vuex'

// 切换动作
const toggle = () => {
  store.dispatch('common/changeSidebarOpened')
}

const store = useStore()
const icon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;

  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
