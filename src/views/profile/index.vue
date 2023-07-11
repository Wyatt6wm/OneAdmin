<template>
  <div class="profile-container">
    <el-row :gutter="10">
      <el-col :span="10">
        <el-row>
          <el-card class="user-info-card">
            <template #header>
              <div>
                <span><b>个人信息</b></span>
              </div>
            </template>
            <el-row class="user-info">
              <el-col :span="8">
                <div class="avatar-wrapper">
                  <el-avatar shape="circle" :size="80" :src="avatarSrc"></el-avatar>
                </div>
                <div class="edit-button">
                  <el-button @click="editProfileVisable = true" plain>修改个人信息</el-button>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="nickname">
                  <h1>{{ hasNickname() ? store.getters.profile.nickname : '你的昵称' }}</h1>
                </div>
                <div class="motto">
                  <span>{{ hasMotto() ? store.getters.profile.motto : '还没有座右铭，快来写下你的座右铭吧~' }}</span>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="quick-access-card">
            <template #header>
              <div>
                <span><b>快捷入口</b></span>
              </div>
            </template>
            <el-row>
              <el-col :span="24">
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="14">
        <el-card class="data-static">
          <template #header>
            <div>
              <span><b>数据统计</b></span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
    <edit-profile :visable="editProfileVisable" @close="editProfileVisable = false"></edit-profile>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import EditProfile from './components/EditProfile.vue'

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

// ----- 修改个人信息 -----
const editProfileVisable = ref(false)

// ----- 昵称、格言 -----
const hasNickname = () => {
  if (store.getters.hasProfile) {
    const profile = store.getters.profile
    if (profile.nickname && profile.nickname.length > 0) {
      return true
    }
  }
  return false
}
const hasMotto = () => {
  if (store.getters.hasProfile) {
    const profile = store.getters.profile
    if (profile.motto && profile.motto.length > 0) {
      return true
    }
  }
  return false
}
</script>

<style lang="scss" scoped>
.profile-container {
  .user-info-card {
    width: 100%;

    .user-info {
      .avatar-wrapper {
        position: relative;
        text-align: center;

        .el-avatar {
          --el-avatar-background-color: none;
        }
      }

      .nickname {
        padding-top: 8px;
        padding-bottom: 10px;
      }

      .motto {
        color: #606266;
      }
    }

    .edit-button {
      text-align: center;
    }
  }

  .quick-access-card {
    width: 100%;
    margin-top: 6px;
  }

  .data-static {
    width: 100%
  }
}
</style>
