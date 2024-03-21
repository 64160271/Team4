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
import SelectCompany from '../components/Certificate/SelectCompany.vue'
import SelectSignature from '../components/Certificate/SelectSignature.vue'
import SelectIntern from '../components/Certificate/SelectIntern.vue'
import ManageSalary from '../components/Report/ManageSalary.vue'
import ReportData from '../components/Report/ReportData.vue'
import AddReportFile from '../components/Report/AddReportFile.vue'
import TestForm from '../components/AddInternForm/TestForm.vue'
import ManageProject from '../components/Project/ManageProject.vue'
import ProjectMember from '../components/Project/ProjectMember.vue'
import Cookies from "js-cookie";
import NotFoundPage from "../components/NotFoundPage.vue";
import HistorySalaryIntern from "../components/Report/HistorySalaryIntern.vue";
import { useAuthenticate } from "../stores/authenticate";

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
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
            path: '/reports/manageSalary',
            name: 'manageSalary',
            component: ManageSalary,
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
            path: '/certificates/selectCompany',
            name: 'selectCompany',
            component: SelectCompany
        },
        {
            path: '/certificates/selectSignature/:companyId',
            name: 'selectSignature',
            component: SelectSignature,
            props: true,
        },
        {
            path: '/certificates/selectIntern/:companyId/:signId',
            name: 'selectIntern',
            component: SelectIntern,
            props: true,
        },
        {
            path: '/reports/manageSalary/:id',
            name: 'reportData',
            component: ReportData
        },
        {
            path: '/reports/manageSalary/:id/addReport-file',
            name: 'addReport-File',
            component: AddReportFile
        },
        {
            path: '/reports/manageSalary/:id/:idIntern',
            name: 'historySalaryIntern',
            component: HistorySalaryIntern
        },
        {
            path: '/projects',
            name: 'manageProject',
            component: ManageProject
        },
        {
            path: '/projects/:id',
            name: 'projectMember',
            component: ProjectMember,
        },
        {
            path: '/:catchAll(.*)',
            name: "NotFoundPage",
            component: NotFoundPage,
        }
    ]
})

router.beforeEach((to, from, next) => {
    const auth = useAuthenticate()

    if (to.name !== 'login' && !auth.isAuthenticate()) {
        next({ name: 'login' })
    }

    else if (to.name === 'login') {
        auth.$reset()
        Cookies.remove('token')
        next()
    }

    else next()
})

export default router