import { createRouter, createWebHistory } from "vue-router";
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import InternData from '../components/InternData.vue'
import AddInternForm from '../components/AddInternForm.vue'
import AddInternFile from '../components/AddInternFile.vue'
import Cookies from "js-cookie";

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
            path: '/interns',
            name: 'internData',
            component: InternData
        },
        {
            path: '/interns/key-data',
            name: 'addInternForm',
            component: AddInternForm
        },
        {
            path: '/interns/add-file',
            name: 'addInternFile',
            component: AddInternFile
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !Cookies.get('token')) next({ name: 'login' })
    else next()
})

export default router