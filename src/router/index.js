import { createRouter, createWebHistory } from "vue-router";
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import InternData from '../components/InternData.vue'
import AddInternForm from '../components/AddInternForm.vue'
import AddInternFile from '../components/AddInternFile.vue'
import AddInternFormV2 from '../components/AddInternFormV2.vue'

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
        },
        {
            path: '/interns/key-data-v2',
            name: 'addInternFormV2',
            component: AddInternFormV2
        }
    ]
})

export default router