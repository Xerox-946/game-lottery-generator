import { createApp } from 'vue'
import Router from './router/index.js';
import App from './App.vue'
import { createPinia } from 'pinia'

import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const pinia = createPinia()
app.use(Router)
app.use(pinia)
app.mount('#app')
