import { createApp } from 'vue'

// 这里有大坑：把样式导入放到App、router导入前，防止样式覆盖，解决dist部署到nginx上样式不生效的问题
// vue add element-plus命令自动创建引入的
import installElementPlus from './plugins/element'
// 引入图标注册函数
import installIcons from './plugins/icons'
// 引入全局样式
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'
// 引入Mock挡板
import installMock from './plugins/mock'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installMock(true)
app.use(store).use(router).mount('#app')
