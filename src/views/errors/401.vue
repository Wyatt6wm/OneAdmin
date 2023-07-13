<template>
  <div class="err-container">
    <div class="err">
      <div class="err-content">
        <div class="err-content__title">401 Unauthorized</div>
        <div class="err-content__headline">抱歉，您没有访问该页面的权限......</div>
        <div class="err-content__info">
          请检查您输入的URL是否正确，或联系管理员获得访问权限。
        </div>
        <el-button type="primary" size="large" round @click="router.push('/')">回到主页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style lang="scss" scoped>
.err-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 70%;
}

.err {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;

  .err-content {
    position: relative;
    float: left;
    width: 500px;
    padding: 30px 0;
    overflow: hidden;

    &__title {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #1482f0;
      opacity: 0;
      margin-bottom: 20px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }

    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }

    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }

    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }

      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>
