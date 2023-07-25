// 状态常量定义
export const STATUS = {
  UNKNOWN: 'unknown',
  NEW: 'new',
  DRAFT: 'draft',
  SUBMIT: 'submit',
  PROGRESS: 'progress',
  EDIT: 'edit',
  FINISH: 'finish',
  CANCEL: 'cancel'
}

// 状态标签的标题和样式参数
export const statusTags = {
  unknown: { label: '未知', type: 'info', effect: 'light' },
  new: { label: '新建', type: 'success', effect: 'light' },
  draft: { label: '草稿', type: 'info', effect: 'light' },
  submit: { label: '未开始', type: '', effect: 'light' },
  progress: { label: '进行中', type: '', effect: 'dark' },
  edit: { label: '变更中', type: 'info', effect: 'light' },
  finish: { label: '已完成', type: 'success', effect: 'dark' },
  cancel: { label: '已取消', type: 'danger', effect: 'dark' }
}
