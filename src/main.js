import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/js/func.js'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
createApp(App).use(VueAxios, axios).use(router).use(pinia).mount('#app')
