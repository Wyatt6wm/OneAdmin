<template>
  <div class="profile-container">
    <el-row>
      <el-col :span="10">
        <el-card class="user-info-card">
          <template #header>
            <div>
              <span><b>个人信息</b></span>
            </div>
          </template>
          <div class="user-info">
            <el-col :span="18" :offset="3">
              <div class="avatar-wrapper">
                <!-- <el-avatar shape="square" :size="40" :src="$store.getters.profile.avatar"></el-avatar> -->
                <el-avatar shape="circle" :size="200" :src="logoUrl"></el-avatar>
              </div>
              <div class="nickname">
                <h1>昵称</h1>
              </div>
              <div class="motto">
                <span>这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭。</span>
              </div>
            </el-col>
          </div>
          <div class="edit-button">
            <el-button plain>修改个人信息</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <template #header>
            <div>
              <span><b>快捷入口</b></span>
            </div>
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const logoUrl = require('@/assets/logo.png')
</script>

<style lang="scss" scoped>
.profile-container {
  .user-info-card {
    margin-right: 10px;

    .user-info {
      text-align: center;

      .avatar-wrapper {
        position: relative;
        padding-top: 35px;
        padding-bottom: 15px;

        .el-avatar {
          --el-avatar-background-color: none;
        }
      }

      .nickname {
        padding-bottom: 15px;
      }

      .motto {
        color: #606266;
        padding-bottom: 30px;
      }
    }

    .edit-button {
      text-align: right;
      padding-bottom: 20px;
    }
  }
}
</style>
