<template>
  <el-row :gutter="8">
    <el-col :span="12">
      <el-card>
        <template #header>
          <div class="card-header">
            <div>
              <span><b>待办详情</b></span>
              <el-divider direction="vertical" />
              <el-tag size="small" :effect="statusTags[todoForm.status].effect" :type="statusTags[todoForm.status].type">
                {{ statusTags[todoForm.status].label }}
              </el-tag>
            </div>
            <div>
              <el-button size="small" plain type="default" :loading="loading" @click="handleBegin">开始</el-button>
              <el-button size="small" plain type="default" :loading="loading" @click="handleEdit">变更</el-button>
              <el-button size="small" plain type="success" :loading="loading" @click="handleFinish">完成</el-button>
              <el-button size="small" plain type="danger" :loading="loading" @click="handleCancel">取消</el-button>
            </div>
          </div>
        </template>
        <el-scrollbar>
          <div class="todo-item-detail">
            <el-form class="todo-item-detail__form" ref="todoFormRef" :model="todoForm" :rules="rules" label-width="100px"
              label-position="right" scroll-to-error>
              <el-form-item label="待办名称" prop="name" required>
                <el-input v-model="todoForm.name" :disabled="inputDisabled" />
              </el-form-item>
              <el-form-item label="紧急度" prop="emergency" required>
                <el-radio-group v-model="todoForm.emergency" :disabled="inputDisabled">
                  <el-radio :label="false" border>一般</el-radio>
                  <el-radio :label="true" border>紧急</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="重要性" prop="importance" required>
                <el-radio-group v-model="todoForm.importance" :disabled="inputDisabled">
                  <el-radio :label="false" border>一般</el-radio>
                  <el-radio :label="true" border>重要</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="截止时间" prop="deadline" required>
                <el-date-picker type="datetime" v-model="todoForm.deadline" :disabled="inputDisabled" />
              </el-form-item>
              <el-form-item label="具体事项" prop="detail">
                <el-input type="textarea" :rows="5" v-model="todoForm.detail" :disabled="inputDisabled" />
              </el-form-item>
              <el-form-item label="工作量评估" prop="workload">
                <el-input type="textarea" v-model="todoForm.workload" :disabled="inputDisabled" />
              </el-form-item>
              <el-form-item prop="workloadHour">
                <span>
                  预估工作总量<el-input-number :precision="1" :min="0" :step="0.1" v-model="todoForm.workloadHour"
                    :disabled="inputDisabled" />小时
                </span>
              </el-form-item>
              <el-form-item prop="workloadDay">
                <span>
                  完成需要跨越<el-input-number :min="0" v-model="todoForm.workloadDay" :disabled="inputDisabled" />天
                </span>
              </el-form-item>
              <el-form-item label="提交时间" prop="submitTime">
                <el-date-picker type="datetime" placeholder="暂未提交" v-model="todoForm.submitTime" disabled />
              </el-form-item>
              <el-form-item label="开始时间" prop="beginTime">
                <el-date-picker type="datetime" placeholder="暂未开始" v-model="todoForm.beginTime" disabled />
              </el-form-item>
              <el-form-item label="完成时间" prop="finishTime">
                <el-date-picker type="datetime" placeholder="暂未完成" v-model="todoForm.finishTime" disabled />
              </el-form-item>
              <el-form-item :label="todoForm.status === 'cancel' ? '取消原因' : '完成结论'" prop="conclusion">
                <el-input type="textarea" :rows="5" placeholder="暂未完成" v-model="todoForm.conclusion" disabled />
              </el-form-item>
            </el-form>
            <el-divider />
            <div class="button-area">
              <el-row>
                <el-col :span="8">
                  <el-button :loading="loading" @click="handleSave">
                    {{ todoForm.status === 'edit' ? '保存变更' : '保存草稿' }}
                  </el-button>
                  <el-button type="danger" plain :loading="loading" @click="handleRemoveDraft">删除草稿</el-button>
                </el-col>
                <el-col :span="1" :offset="12">
                  <el-button type="primary" :loading="loading" @click="handleSubmit">
                    {{ todoForm.status === 'edit' ? '确认变更' : '提交待办' }}
                  </el-button>
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
            <el-button size="small" plain type="primary" :loading="loading" @click="handleAddLog">新增进度</el-button>
          </div>
        </template>
        <el-scrollbar>
          <div class="todo-item-detail">
            <el-empty v-if="logList == null || logList.length === 0" description="暂无进度" />
            <el-timeline v-else class="todo-item-detail__log">
              <el-timeline-item v-for="(item, index) in logList" :key="index"
                :timestamp="new Date(item.submitTime).toLocaleString()">
                <el-space direction="vertical" alignment="start">
                  <div v-if="item.title != null && item.title.length > 0">
                    <span><b>{{ item.title }}</b></span>
                  </div>
                  <div v-if="item.log != null && item.log.length > 0" v-html="item.log" />
                </el-space>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>
    <ConclusionDialog :visable="conclusionDialogVisable" :type="conclusionDialogType" :todoId="conclusionDialogTodoId"
      @close="conclusionDialogVisable = false" @render="renderAfterConclusion" />
    <TodoLogDialog :visable="todoLogDialogVisable" :todoId="todoLogDialogTodoId" @close="todoLogDialogVisable = false"
      @render="renderAfterAddLog" />
  </el-row>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, onDeactivated, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import api from '@/api'
import { STATUS, statusTags } from '../../utils/status'
import ConclusionDialog from './ConclusionDialog.vue'
import TodoLogDialog from './TodoLogDialog.vue'

// ========== 控制变量 ==========
const router = useRouter()
const route = useRoute()
const store = useStore()
// ----- 左侧待办表单 -----
const todoFormRef = ref(null)
const todoForm = ref({
  id: null,
  name: '',
  emergency: false,
  importance: false,
  deadline: '',
  detail: '',
  workload: '',
  workloadHour: 0,
  workloadDay: 0,
  beginTime: null,
  submitTime: null,
  finishTime: null,
  status: STATUS.UNKNOWN,
  conclusion: ''
})
const rules = ref({
  name: [{ required: true, message: '请输入待办名称' }],
  deadline: [{ required: true, message: '请选择截止时间' }]
})
const inputDisabled = ref(true)
const loading = ref(false)
// ----- 右侧待办日志 -----
const logList = ref([])
// ----- 结论对话框 -----
const conclusionDialogVisable = ref(false)
const conclusionDialogType = ref(STATUS.FINISH)
const conclusionDialogTodoId = ref(0)
// ----- 进度对话框 -----
const todoLogDialogVisable = ref(false)
const todoLogDialogTodoId = ref(0)

// ========== 公共函数 ==========
// 按钮提示
const errClickAlert = () => {
  ElMessage.warning('当前待办为【' + statusTags[todoForm.value.status].label + '】状态，无法进行此操作')
}

// ========== 生命周期函数 ==========
// 初始化
onActivated(async () => {
  // 1、新建待办时
  if (route.params.todoId === 'new') {
    // 左侧表单初始化
    if (todoFormRef.value) {
      todoFormRef.value.resetFields() // 重置表单
    }
    todoForm.value.id = null // 修复bug: 第二次新建时用的是前一次的id
    todoForm.value.status = STATUS.NEW
    // 右侧日志初始化
    logList.value.length = 0
  } else {
    if (todoFormRef.value) {
      todoFormRef.value.resetFields() // 重置表单
    }
    todoForm.value.status = STATUS.UNKNOWN
    // 2、操作具体待办时
    // 左侧表单初始化
    todoForm.value = await api.todo.getTodo(route.params.todoId).then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data.todo
        } else {
          ElMessage.error(res.mesg)
        }
      }
    }).catch((error) => {
      ElMessage.error(error.message)
    })
    // 右侧日志初始化
    logList.value = await api.todo.getTodoLogList(route.params.todoId)
      .then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            return res.data.todoLogList
          } else {
            ElMessage.error(res.mesg)
          }
        }
      }).catch((error) => {
        ElMessage.error(error.message)
      })
  }
  const nowStatus = todoForm.value.status
  inputDisabled.value = !(nowStatus === STATUS.NEW || nowStatus === STATUS.DRAFT || nowStatus === STATUS.EDIT)
})
// ----- 离开页面提示 -----
onDeactivated(() => {
})

// ========== 按钮操作 ==========
// 保存草稿/保存变更
const handleSave = () => {
  loading.value = true
  const nowStatus = todoForm.value.status
  if (nowStatus === STATUS.NEW || nowStatus === STATUS.DRAFT || nowStatus === STATUS.EDIT) {
    todoFormRef.value.validate(async (valid) => {
      if (!valid) return
      todoForm.value.category = route.params.category
      todoForm.value = await api.todo.saveDraft(todoForm.value).then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            ElMessage.success(nowStatus === STATUS.EDIT ? '已保存变更' : '已保存草稿')
            return res.data.todo
          } else {
            ElMessage.error(res.mesg)
          }
        }
      }).catch((error) => {
        ElMessage.error(error.message)
      })
      // 如果是新建则切换到该待办的路由
      if (nowStatus === STATUS.NEW && todoForm.value.id != null) {
        store.dispatch('viewSettings/removeViewTagByFullPath', route.fullPath)
        router.push('/todo/detail/' + route.params.category + '/' + todoForm.value.id)
      }
    })
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 提交待办/确认变更
const handleSubmit = () => {
  loading.value = true
  const nowStatus = todoForm.value.status
  if (nowStatus === STATUS.NEW || nowStatus === STATUS.DRAFT || nowStatus === STATUS.EDIT) {
    todoFormRef.value.validate(async (valid) => {
      if (!valid) return
      todoForm.value.category = route.params.category
      const { todo, todoLogList } = await api.todo.submitTodo(todoForm.value).then((res) => {
        if (res && res.succ != null) {
          if (res.succ) {
            ElMessage.success(nowStatus === STATUS.EDIT ? '变更成功' : '待办已提交')
            inputDisabled.value = true
            return res.data
          } else {
            ElMessage.error(res.mesg)
          }
        }
      }).catch((error) => {
        ElMessage.error(error.message)
      })
      // 渲染页面数据
      todoForm.value = todo
      logList.value = todoLogList
      // 如果是新建则切换到该待办的路由
      if (nowStatus === STATUS.NEW && todoForm.value.id != null) {
        store.dispatch('viewSettings/removeViewTagByFullPath', route.fullPath)
        router.push('/todo/detail/' + route.params.category + '/' + todoForm.value.id)
      }
    })
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 删除草稿
const handleRemoveDraft = () => {
  loading.value = true
  if (todoForm.value.status === STATUS.DRAFT) {
    ElMessageBox.confirm('是否删除草稿？删除后数据不可恢复！', '请确认', { type: 'warning' })
      .then(() => {
        api.todo.removeDraft(todoForm.value.id).then((res) => {
          if (res && res.succ != null) {
            if (res.succ) {
              ElMessage.success('成功删除草稿')
              store.dispatch('viewSettings/removeViewTagByFullPath', route.fullPath)
              router.go(-1)
            } else {
              ElMessage.error(res.mesg)
            }
          }
        }).catch((error) => {
          ElMessage.error(error.message)
        })
      })
      .catch(() => {
        // 点击“取消”不做动作
      })
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 开始
const handleBegin = () => {
  loading.value = true
  if (todoForm.value.status === STATUS.SUBMIT) {
    ElMessageBox.confirm('是否开始处理待办？', '请确认')
      .then(async () => {
        const { todo, todoLogList } = await api.todo.toProgress(todoForm.value.id).then((res) => {
          if (res && res.succ != null) {
            if (res.succ) {
              ElMessage.success('待办已开始')
              return res.data
            } else {
              ElMessage.error(res.mesg)
            }
          }
        }).catch((error) => {
          ElMessage.error(error.message)
        })
        // 渲染页面数据
        todoForm.value.beginTime = todo.beginTime
        todoForm.value.status = todo.status
        logList.value = todoLogList
      })
      .catch(() => {
        // 点击“取消”不做动作
      })
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 变更
const handleEdit = () => {
  loading.value = true
  if (todoForm.value.status === STATUS.PROGRESS) {
    ElMessageBox.confirm('是否暂停待办进程，进行变更？', '请确认')
      .then(async () => {
        const { todo, todoLogList } = await api.todo.toEdit(todoForm.value.id).then((res) => {
          if (res && res.succ != null) {
            if (res.succ) {
              ElMessage.success('待办已处于变更状态')
              inputDisabled.value = false
              return res.data
            } else {
              ElMessage.error(res.mesg)
            }
          }
        }).catch((error) => {
          ElMessage.error(error.message)
        })
        // 渲染页面数据
        todoForm.value.status = todo.status
        logList.value = todoLogList
      })
      .catch(() => {
        // 点击“取消”不做动作
      })
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 完成
const handleFinish = () => {
  loading.value = true
  if (todoForm.value.status === STATUS.PROGRESS) {
    conclusionDialogVisable.value = true
    conclusionDialogType.value = STATUS.FINISH
    conclusionDialogTodoId.value = todoForm.value.id
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 取消
const handleCancel = () => {
  loading.value = true
  if (todoForm.value.status === STATUS.SUBMIT || todoForm.value.status === STATUS.PROGRESS || todoForm.value.status === STATUS.EDIT) {
    conclusionDialogVisable.value = true
    conclusionDialogType.value = STATUS.CANCEL
    conclusionDialogTodoId.value = todoForm.value.id
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 填写结论后渲染页面
const renderAfterConclusion = (data) => {
  const { todo, todoLogList } = data
  todoForm.value.finishTime = todo.finishTime
  todoForm.value.status = todo.status
  todoForm.value.conclusion = todo.conclusion
  logList.value = todoLogList
}
// 新增进度
const handleAddLog = () => {
  loading.value = true
  if (todoForm.value.status === STATUS.SUBMIT || todoForm.value.status === STATUS.PROGRESS || todoForm.value.status === STATUS.EDIT) {
    todoLogDialogVisable.value = true
    todoLogDialogTodoId.value = todoForm.value.id
  } else {
    errClickAlert()
  }
  loading.value = false
}
// 新增进度后渲染页面
const renderAfterAddLog = (data) => {
  logList.value = data.todoLogList
}
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
    padding-top: 10px;
  }

  .button-area {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
