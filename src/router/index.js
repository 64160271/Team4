import { createRouter, createWebHistory } from "vue-router";
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

export default router