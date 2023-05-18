<template>
  <div class="view-tag-container">
    <el-scrollbar class="view-tag-wrapper">
      <router-link class="view-tag-item" :class="isActive(tag) ? 'active' : ''" :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }" v-for="(tag, index) in $store.getters.viewTagList" :key="tag.fullPath" :to="{ path: tag.fullPath }"
        @contextmenu.prevent="openContextMenu($event, index, tag.fullPath)">
        {{ tag.title }}
        <svg-icon v-show="!isActive(tag)" icon="close" @click.prevent.stop="onCloseClick(index)"></svg-icon>
      </router-link>
    </el-scrollbar>
    <context-menu v-show="visible" :style="menuStyle" :index="selectIndex" :tagPath="selectTagPath"></context-menu>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import ContextMenu from './ContextMenu.vue'

const store = useStore()
const route = useRoute()

// 是否被选中
const isActive = (tag) => {
  return tag.path === route.path
}

// 关闭页面标签
const onCloseClick = (index) => {
  store.dispatch('common/removeViewTags', 'index', index)
}
// 右键菜单相关
const selectIndex = ref(0)
const selectTagPath = ref('')
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})
// 打开右键菜单
const openContextMenu = (e, index, tagPath) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  selectTagPath.value = tagPath
  visible.value = true
}
// 关闭右键菜单
const closeContextMenu = () => {
  visible.value = false
}

// 监听页面标签关闭事件
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeContextMenu)
  } else {
    document.body.removeEventListener('click', closeContextMenu)
  }
})
</script>

<style lang="scss" scoped>
.view-tag-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .view-tag-wrapper {
    .view-tag-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        color: #fff;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
      }

      .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
}
</style>
