<template>
  <div class="navbar">
    <!-- 菜单栏伸缩按钮 -->
    <hamburger class="hamburger-container"></hamburger>
    <!-- 面包屑 -->
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!-- 头像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="circle" :size="40" :src="avatarSrc"></el-avatar>
          <el-icon class="down-triangle" :size="15">
            <CaretBottom />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="__blank" href="https://github.com/Wyatt6wm/WyattAppRealm-Docs">
              <el-dropdown-item>系统文档</el-dropdown-item>
            </a>
            <el-dropdown-item @click="initRoutes" disabled>
              测试按钮
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import { initRoutes } from '@/router'

const store = useStore()

// ----- 头像 -----
const defaultAvatar = require('@/assets/logo.png')
const avatarSrc = ref(defaultAvatar)
const showProfileAvatar = () => {
  if (store.getters.profile.avatar) {
    avatarSrc.value = store.getters.profile.avatar
  }
}
// 监听头像是否变化
watch(
  () => {
    return store.getters.hasProfile
  },
  showProfileAvatar,
  {
    immediate: true
  }
)

// ----- 退出登录 -----
const logout = () => {
  store.dispatch('userLogin/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer; // 手指形状鼠标指针

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
