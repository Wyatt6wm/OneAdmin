<!-- 自定义SVG图标组件，具备两种能力： -->
<!-- （1）显示外部SVG图标 -->
<!-- （2）显示本地icons中的SVG图标 -->

<!-- 使用ElementPlus图标组件的用法 -->
<!-- <el-icon><avatar /></el-icon> -->
<!-- 使用自定义SVG图标组件展示外部图标的用法 -->
<!-- <svg-icon icon="https://ip:port/user.svg"></svg-icon> -->
<!-- 使用自定义SVG图标组件展示本地图标的用法 -->
<!-- <svg-icon icon="user"></svg-icon> -->

<template>
  <div v-if="isExternalIcon" :style="externalIconStyle" class="svg-external-icon svg-icon" :class="className"></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { defineProps, computed } from 'vue'

// 定义参数，调用组件时传入
const props = defineProps({
  // 内部图标：图标名称；外部图标：URL
  icon: {
    type: String,
    required: true
  },
  // 外层给此图标组件传入的样式类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断是否为外部资源
 * @param {*} path 资源路径
 */
function isExternalResource(path) {
  // 判断path是否以http(s): / mailto: / tel:开头，如果是则是外部资源
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 判断当前图标是否为外部图标
const isExternalIcon = computed(() => isExternalResource(props.icon))
// 定义外部图标的样式
const externalIconStyle = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))

// 组装本地图标的标签名
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
