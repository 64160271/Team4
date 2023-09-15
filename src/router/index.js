import { createRouter, createWebHistory } from "vue-router";
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import InternData from '../components/InternData.vue'
import AddInternForm from '../components/AddInternForm.vue'
import AddInternFile from '../components/AddInternFile.vue'
import AddInternFormV2 from '../components/AddInternFormV2.vue'
import ShowCertificate from '../components/Certificate/ShowCertificate.vue'
import SalaryReport from '../components/Report/SalaryReport.vue'
import ManageCompany from '../components/CerfificateData/ManageCompany.vue'
import ManageSignature from '../components/CerfificateData/ManageSignature.vue'
import ManageUniversity from '../components/University/ManageUniversity.vue'

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
            path: '/interns/:id',
            name: 'internData',
            component: InternData,
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
        },
        {
            path: '/certificates',
            name: 'showCertificate',
            component: ShowCertificate
        },
        {
            path: '/reports',
            name: 'salaryReport',
            component: SalaryReport,
        },
        {
            path: '/universities',
            name: 'manageUniversity',
            component: ManageUniversity,
        },
        {
            path: '/signatures',
            name: 'manageSignature',
            component: ManageSignature
        },
        {
            path: '/companies',
            name: 'manageCompany',
            component: ManageCompany
        }
    ]
})

export default router