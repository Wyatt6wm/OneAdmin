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
                  <el-avatar shape="circle" :size="80" :src="logoUrl"></el-avatar>
                </div>
                <div class="edit-button">
                  <el-button plain>修改个人信息</el-button>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="nickname">
                  <h1>昵称</h1>
                </div>
                <div class="motto">
                  <span>这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭，这里填座右铭。</span>
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
                hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="14">
        <el-card class="data-static">
          <template #header>
            <div>
              <span><b>数据看板</b></span>
            </div>
          </template>
          vfinvjfdnvnvfnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
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
    .user-info {
      .avatar-wrapper {
        position: relative;
        text-align: center;

        .el-avatar {
          --el-avatar-background-color: none;
        }
      }

      .nickname {
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
    margin-top: 6px;
  }
}
</style>
