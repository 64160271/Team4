import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import InternData from '../components/InternInfo/InternData.vue'
import WorkInfo from '../components/InternInfo/WorkInfo.vue'
import SalaryInfo from '../components/InternInfo/SalaryInfo.vue'
import LeaveInfo from '../components/InternInfo/LeaveInfo.vue'
import DocumentInfo from '../components/InternInfo/DocumentInfo.vue'
import AddInternForm from '../components/AddInternForm/AddInternForm.vue'
import AddInternFile from '../components/AddInternByFile/AddInternFile.vue'
import ShowCertificate from '../components/Certificate/ShowCertificate.vue'
import SalaryReport from '../components/Report/SalaryReport.vue'
import ManageCompany from '../components/CerfificateData/ManageCompany.vue'
import ManageSignature from '../components/CerfificateData/ManageSignature.vue'
import ManageUniversity from '../components/University/ManageUniversity.vue'
import Cookies from "js-cookie";

const router = createRouter({
    /* history: createWebHashHistory(import.meta.env.VITE_BASE_URL) for deploy */
    history: createWebHistory(),
    routes: [
        {
            path: '/interns',
            name: 'index',
            component: Index,
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
            path: '/interns/:id/work-info',
            name: 'workInfo',
            component: WorkInfo,
        },
        {
            path: '/interns/:id/salary-info',
            name: 'salaryInfo',
            component: SalaryInfo,
        },
        {
            path: '/interns/:id/leave-info',
            name: 'leaveInfo',
            component: LeaveInfo,
        },
        {
            path: '/interns/:id/document-info',
            name: 'documentInfo',
            component: DocumentInfo
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
        },
        {
            path: '/test',
            component: TestForm
        }
    ]
})

/*
   * beforeEach
   * ฟังก์ชันใช้ตรวจสอบว่ามี token ของผู้ใช้หรือไม่ ถ้าหากไม่มีจะเด้งไปหน้า Login
   * param: to (path ที่จะไป), from (path เดิม), next (คำสั่งถัดไป)
   * return: -
*/
router.beforeEach((to, from, next) => {
    const token = Cookies.get('token')

    if (to.name !== 'login' && !token) {
        next({ name: 'login' })
    }

    if (to.name == 'login') {
        Cookies.remove('token')
        Cookies.remove('user')
        next()
    }
    else next()
})

export default router