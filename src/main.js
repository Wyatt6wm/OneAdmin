import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vue add element-plus命令自动创建引入的
import installElementPlus from './plugins/element'
// 引入图标注册函数
import installIcons from './plugins/icons'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(store).use(router).mount('#app')
