<template>
  <el-card height="100%">
    <div class="button-area">
      <el-button type="primary" @click="handleAdd">新建待办</el-button>
      <el-button type="success" @click="refreshList" :loading="loading">刷新列表</el-button>
    </div>
    <el-table max-height="calc(100vh - 185px)" stripe :data="list">
      <el-table-column label="待办事项" align="center" width="350" prop="name">
      </el-table-column>
      <el-table-column label="查看" align="center" width="80">
        <template #default="{ row }">
          <el-button size="small" type="primary" round plain @click="handleView(row.id)">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="紧急度" align="center" width="90">
        <template #default="{ row }">
          <el-tag v-if="row.emergency" type="danger" effect="light">紧急</el-tag>
          <el-tag v-else type="info" effect="plain">一般</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="重要性" align="center" width="90">
        <template #default="{ row }">
          <el-tag v-if="row.importance" type="danger" effect="light">重要</el-tag>
          <el-tag v-else type="info" effect="plain">一般</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" align="center" width="200">
        <template #default="{ row }">
          {{ new Date(row.deadline).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="100">
        <template #default="{ row }">
          <el-tag :type="statusTags[row.status].type" :effect="statusTags[row.status].effect">
            {{ statusTags[row.status].label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最新进度" prop="lastLogContent">
        <template #default="{ row }">
          <div v-if="row.lastLogTitle != null && row.lastLogTitle.length > 0">
            <span><b>{{ row.lastLogTitle }}</b></span>
          </div>
          <div v-if="row.lastLogContent != null && row.lastLogContent.length > 0" v-html="row.lastLogContent" />
          <div v-if="row.lastLogSubmitTime != null">
            <span style="color:#C0C4CC">
              <i>{{ new Date(row.lastLogSubmitTime).toLocaleString() }}</i>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { onActivated, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '@/api'
import { statusTags } from '../utils/status'

const router = useRouter()
const route = useRoute()

// ----- 初始化 -----
const list = ref([])
const init = async () => {
  const category = route.name === 'todoWorkList' ? 'work' : 'daily'
  const { todoList, lastLogList } = await api.todo.getTodoList(category)
    .then((res) => {
      if (res && res.succ != null) {
        if (res.succ) {
          return res.data
        } else {
          ElMessage.error(res.mesg)
        }
      }
    })
    .catch((error) => {
      ElMessage.error(error.message)
    })

  list.value.length = 0
  for (let i = 0; i < todoList.length; i++) {
    for (let j = 0; j < lastLogList.length; j++) {
      if (todoList[i].lastLogId === lastLogList[j].id) {
        todoList[i].lastLogTitle = lastLogList[j].title
        todoList[i].lastLogContent = lastLogList[j].log
        todoList[i].lastLogSubmitTime = lastLogList[j].submitTime
        break
      }
    }
    list.value.push(todoList[i])
  }
}
onActivated(() => {
  init()
})

// ----- 点击“新建待办” -----
const handleAdd = () => {
  if (route.name === 'todoWorkList') {
    router.push('/todo/detail/work/new')
  } else if (route.name === 'todoDailyList') {
    router.push('/todo/detail/daily/new')
  }
}

// ----- 点击“刷新列表” -----
const loading = ref(false)
const refreshList = () => {
  loading.value = true
  init()
  ElMessage.success('刷新完成')
  loading.value = false
}

// ----- 点击查看 -----
const handleView = (todoId) => {
  if (route.name === 'todoWorkList') {
    router.push('/todo/detail/work/' + todoId)
  } else if (route.name === 'todoDailyList') {
    router.push('/todo/detail/daily/' + todoId)
  }
}
</script>

<style lang="scss" scoped>
.button-area {
  text-align: left;
  padding-bottom: 10px;
}
</style>
