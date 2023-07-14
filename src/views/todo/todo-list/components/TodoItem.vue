<template>
  <el-row :gutter="8">
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <div>
              <span><b>待办详情</b></span>
              <el-divider direction="vertical" />
              <el-tag size="small">状态</el-tag>
            </div>
            <div>
              <el-button size="small" plain type="default">开始</el-button>
              <el-button size="small" plain type="default">变更</el-button>
              <el-button size="small" plain type="success">完成</el-button>
              <el-button size="small" plain type="danger">取消</el-button>
            </div>
          </div>
        </template>
        <el-scrollbar>
          <div class="todo-item-detail">
            <el-form class="todo-item-detail__form" :model="todoForm" label-width="100px" label-position="right">
              <el-form-item label="待办名称" required>
                <el-input v-model="todoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="紧急度" required>
                <el-radio-group v-model="todoForm.emergency">
                  <el-radio :label="0">不紧急</el-radio>
                  <el-radio :label="1">紧急</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="重要性" required>
                <el-radio-group v-model="todoForm.importance">
                  <el-radio :label="0">不重要</el-radio>
                  <el-radio :label="1">重要</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="截止时间" required>
                <el-date-picker type="datetime" v-model="todoForm.deadline" />
              </el-form-item>
              <el-form-item label="具体事项">
                <el-input type="textarea" :rows="5" v-model="todoForm.detail"></el-input>
              </el-form-item>
              <el-form-item label="工作量评估">
                <el-input type="textarea" v-model="todoForm.workload"></el-input>
              </el-form-item>
              <el-form-item>
                <span>
                  预估工作总量
                  <el-input-number :precision="1" :min="0" :step="0.1" v-model="todoForm.workloadHour" />
                  小时，需要用
                  <el-input-number :min="0" v-model="todoForm.workloadDay" />
                  天完成
                </span>
              </el-form-item>
              <el-form-item label="提交时间">
                <el-date-picker type="datetime" placeholder="暂未提交" v-model="todoForm.submitTime" disabled />
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker type="datetime" placeholder="暂未开始" v-model="todoForm.beginTime" disabled />
              </el-form-item>
              <el-form-item label="完成时间">
                <el-date-picker type="datetime" placeholder="暂未完成" v-model="todoForm.finishTime" disabled />
              </el-form-item>
              <el-form-item label="完成结论">
                <el-input type="textarea" :rows="5" placeholder="暂未完成" v-model="todoForm.conclusion" disabled></el-input>
              </el-form-item>
            </el-form>
            <el-divider />
            <div class="button-area">
              <el-row>
                <el-col :span="8">
                  <el-button>保存草稿</el-button>
                  <el-button type="danger" plain>删除草稿</el-button>
                </el-col>
                <el-col :span="1" :offset="12">
                  <el-button type="primary">提交待办</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <span><b>进度跟踪</b></span>
            <el-button size="small" plain type="primary">新增进度</el-button>
          </div>
        </template>
        <el-scrollbar>
          <div class="todo-item-detail">
            <el-timeline class="todo-item-detail__log">
              <el-timeline-item
                timestamp="2023-07-14">时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
              <el-timeline-item timestamp="2023-07-14">时间线</el-timeline-item>
            </el-timeline>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'

const defaultTodoForm = {
  name: '',
  emergency: 0,
  importance: 0,
  deadline: '',
  detail: '',
  workload: '',
  workloadHour: 0,
  workloadDay: 0,
  conclusion: ''
}
const todoForm = ref(defaultTodoForm)
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-item-detail {
  width: 100%;
  max-height: calc(100vh - 203px);

  &__form {
    width: 95%;
    height: 100%;
  }

  &__log {
    width: 95%;
    height: 100%;
  }

  .button-area {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
