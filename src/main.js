import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vue add element-plus命令自动创建引入的
import installElementPlus from './plugins/element'

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
