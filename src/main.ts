import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './router/router-guard'
import './styles/index.css'
import 'virtual:uno.css'

const store = createPinia()

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
