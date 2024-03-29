import './assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/js/func.js'
import LayoutMenuName from './components/layouts/LayoutMenuName.vue'
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { LoadingPlugin } from 'vue-loading-overlay'
import "vue-loading-overlay/dist/css/index.css"
import SectionSpace from "./components/Component/SectionSpace.vue"

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

createApp(App)
.use(LoadingPlugin, {
    color: 'red'
})
.use(VueAxios, axios)
.use(router)
.use(pinia)
.component('LayoutMenuName', LayoutMenuName)
.component('SectionSpace', SectionSpace)
.mount('#app')