import { createRouter, createWebHistory } from "vue-router";
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import InternData from '../components/InternData.vue'

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
        },
        {
            path: '/interns/view',
            name: 'internData',
            component: InternData
        }
    ]
})

export default router