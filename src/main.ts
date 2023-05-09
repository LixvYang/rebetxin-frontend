import App from './App.vue'
import { createApp } from 'vue'
import { registerPlugins,listenWindow } from '@/plugins'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import { setupStore } from './store'



const app = createApp(App)

setupStore()
registerPlugins(app)
listenWindow(app)
app.mount('#app')


// 设置全局错误处理程序
app.config.errorHandler = (err, vm, info) => {
  console.error('Error:', err)
  console.error('Vue component:', vm)
  console.error('Error info:', info)
}
