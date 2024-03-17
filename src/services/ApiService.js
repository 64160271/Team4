/*
 * ApiService
 * Service ที่รวม Api ทั้งหมดของระบบ Internship Management System
 * Author: Team4
 * Create date: 18-08-2566
*/

import axios from 'axios'

export default class ApiService {

    /*
     * getAllUniversity
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลมหาวิทยาลัยทั้งหมด
     * param: -
     * return: ข้อมูลมหาวิทยาลัยทั้งหมด
    */
    getAllUniversity = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/universities`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllFaculty
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลคณะทั้งหมด
     * param: -
     * return: ข้อมูลคณะทั้งหมด
    */
    getAllFaculty = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/faculties`)
            .then((response) => {
                return response.data
            })
    }

     /*
     * getAllMajor
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลสาขาทั้งหมด
     * param: -
     * return: ข้อมูลสาขาทั้งหมด
    */
    getAllMajor = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/majors`)
            .then((response) => {
                return response.data
            })
    }

     /*
     * getFacultyByUniversityId
     * ฟังก์ชันเรียก api สำหรับค้นหาคณะจากรหัสมหาวิทยาลัย
     * param: id ของมหาวิทยาลัย
     * return: ข้อมูลคณะในมหาวิทยาลัย
    */
    getFacultyByUniversityId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/faculties/university/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getMajorByFacultyId
     * ฟังก์ชันเรียก api สำหรับค้นหาสาขาภายในคณะ
     * param: id ของคณะ
     * return: ข้อมูลสาขา
    */
    getMajorByFacultyId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/majors/faculty/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllSection
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลฝ่ายทั้งหมด
     * param: -
     * return: ข้อมูลฝ่ายทั้งหมด
    */
    getAllSection = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/sections`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllMentor
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลพี่เลียงทั้งหมด
     * param: -
     * return: ข้อมูลพี่เลี้ยงทั้งหมด
    */
    getAllMentor = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/mentors`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getMentorBySectionId
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลพี่เลี้ยงทั้งหมดในฝ่าย
     * param: id ของฝ่าย
     * return: พี่่เลี้ยงในฝ่าย
    */
    getMentorBySectionId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/mentors/section/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getMentorByInternId
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลพี่เลี้ยงของนักศึกษา
     * param: id ของนักศึกษา
     * return: ข้อมูลพี่เลี้ยง
    */
    getMentorByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/mentors/intern/${id}`)
            .then((resposne) => {
                return resposne.data
            })
    }

    /*
     * getDepartmentBySectionId
     * ฟังก์ชันเรียก api ดูข้อมูลแผนกในฝ่าย
     * param: id ของฝ่าย
     * return: ข้อมูลแผนก
    */
    getDepartmentBySectionId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/departments/section/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllTeam
     * ฟังก์ชันเรียก api ดูขั้อมูลทีมทั้งหมด
     * param: -
     * return: ช้อมูลทีมทั้งหมด
    */
    getAllTeam = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/teams`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getTeamBySectionId
     * ฟังก์ชันเรียก api ดูข้อมูลทีมในฝ่าย
     * param: id ของฝ่าย
     * return: ข้อมูลทีมในฝ่าย
    */
    getTeamBySectionId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/teams/section/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getSectionWithMentor
     * ฟังก์ชันเรียก api ดูข้อมูลฝ่ายและพี่เลี้ยงในฝ่าย
     * param: -
     * return: ข้อมูลฝ่ายและพี่เลี้ยงในฝ่ายทั้งหมด
    */
    getSectionWithMentor = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/sections/mentors`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllRole
     * ฟังก์ชันเรียก api ดูข้อมูลตำแหน่งงานทั้งหมด
     * param: params (query ที่ต้องการ)
     * return: ข้อมูลตำแหน่งงานทั้งหมด
    */
    getAllRole = async (params) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/roles`, { params: params })
            .then((response) => {
                return response.data
            })
    }

    /*
     * getInternById
     * ฟังก์ชันเรียก api ดูข้อมูลนักศึกษาจาก id ของนักศึกษา
     * param: id ของนักศึกษา
     * return: ข้อมูลนักศึกษา
    */
    getInternById = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllSectionWithRelated
     * ฟังก์ชันเรียก api ดูข้อมูลฝ่ายและข้อมูลที่สัมพันธ์กันทั้งหมด
     * param: -
     * return: ข้อมูลฝ่ายและข้อมูลที่สัมพันธ์กัน เช่น พี่เลี้ยง แผนก ทีม
    */
    getAllSectionWithRelated = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/sections/related`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllUniversityWithRelated
     * ฟังก์ชันเรียก api ดูข้อมูลมหาวิทยาลัยและข้อมูลที่สัมพํันธ์กันทั้งหมด
     * param: -
     * return: ข้อมูลฝ่ายและข้อมูลที่สัมพันธ์กันทั้งหมด เช่น คณะ สาขา
    */
    getAllUniversityWithRelated = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/universities/related`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createIntern
     * ฟังก์ชันเรียก api สำหรับสร้างข้อมูลนักศึกษาฝึกงาน
     * param: ข้อมูลที่ต้องการเพิ่ม
     * return: สถานะการเพิ่มข้อมูล
    */
    createIntern = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/interns`, data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => {
                return response.data
            })
    }

    /*
     * editInternData
     * ฟังก์ชันเรียก api แก้ไขข้อมูลนักศึกษาฝึกงาน
     * param: ข้อมูลที่ต้องการแก้ไข, id ของนักศึกษาฝึกงาน
     * return: สถานะการแก้ไขข้อมูล
    */
    editInternData = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/interns/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => {
                return response.data
            })
    }

    /*
     * getSalaryByInternId
     * ฟังก์ชันเรียก api ดูข้อมูลเบี้ยเลี้ยงของนักศึกษาฝึกงาน
     * param: id ของนักศึกษาฝึกงาน
     * return: ข้อมูลเบี้ยเลี้ยง
    */
    getSalaryByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getLeaveInfoByInternId
     * ฟังก์ชันเรียก api ดูข้อมูลการลาทั้งหมดของนักศึกษาฝึกงาน
     * param: id ของนักศึกษาฝึกงาน
     * return: ข้อมูลการลา
    */
    getLeaveInfoByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/leavesinfo/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createLeaveInfo
     * ฟังก์ชันเรียก api สำหรับสร้างข้อมูลการลา
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createLeaveInfo = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/leavesinfo`, data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => {
                return response.data
            })
    }

    /*
     * getWorkInfoByInternId
     * ฟังก์ชันเรียก api สำหรับดูข้อมูลการทำงานของนักศึกษา
     * param: id ของนักศึกษา
     * return: ข้อมูลการทำงาน
    */
    getWorkInfoByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/workinfo/intern/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createUniversity
     * ฟังก์ชันเรียก api สร้างข้อมูลมหาวิทยาลัย
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createUniversity = async (data) => {
        return await axios.post(
            `${import.meta.env.VITE_API_HOST}/universities`,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then((response) => {
            return response.data
        })
    }

    /*
     * editUniversity
     * ฟังก์ชันเรียก api แก้ไขข้อมูลมหาวิทยาลัย
     * param: ข้อมูลที่ต้องการแก้ไข, id มหาวิทยาลัย
     * return: สถานะการแก้ไขข้อมูล
    */
    editUniversity = async (data, id) => {
        return await axios.put(
            `${import.meta.env.VITE_API_HOST}/universities/${id}`,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        ).then((response) => {
            return response.data
        })
    }

 
    /*
     * getAllCompany
     * ฟังก์ชันเรียก api ดูข้อมูลบริษัททั้งหมด
     * param: -
     * return: ข้อมูลบริษัททั้งหมด
    */
    getAllCompany = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/companies`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getLeaveInfoFile
     * ฟังก์ชันเรียก api ดูข้อมูลไฟล์การลา
     * param: id ของข้อมูลการลา
     * return: เอกสารแนบข้อมูลการลา
    */
    getLeaveInfoFile = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/leavesinfo/file/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getDocumentByInternId
     * ฟังก์ชันเรียก api ดูข้อมูลเอกสารส่วนตัวของนักศึกษาฝึกงาน
     * param: id ของนักศึกษาฝึกงาน, query ที่ต้องการ
     * return: ข้อมูลเอกสารส่วนตัว
    */
    getDocumentByInternId = async (id, params = '') => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/documents/intern/${id}`, { params: params })
            .then((response) => {
                return response.data
            })
    }

    /*
     * getDocumentFile
     * ฟังก์ชันเรียก api ดูข้อมูลไฟล์เอกสารส่วนตัว
     * param: id ของข้อมูลเอกสาร
     * return: ไฟล์เอกสาร
    */
    getDocumentFile = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/documents/file/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createDocument
     * ฟังก์ชันเรียก api สร้างข้องมูลเอกสารส่วนตัว
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createDocument = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/documents`, data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => {
                return response.data
            })
    }

    /*
     * deleteDocument
     * ฟังก์ชันเรียก api สำหรับลบข้อมูลเอกสาร
     * param: id ของเอกสาร
     * return: สถานะการลบข้อมูล
    */
    deleteDocument = async (id) => {
        return await axios.delete(`${import.meta.env.VITE_API_HOST}/documents/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createSalaryData
     * ฟังก์ชันเรียก api สำหรับสร้างข้อมูลเบี้ยเลี้ยงของนักศึกษาฝึกงาน
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createSalaryData = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/salaries`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createSignature
     * ฟังก์ชันเรียก api สร้างข้อมูลลายเซ็น
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createSignature = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/signatures`, data, { headers: {"Content-Type": "multipart/form-data"} })
            .then((response) => {
                return response.data
            })
    }

    /*
     * getAllSignatureWithCompany
     * ฟังก์ชันเรียก api ดูข้้อมูลลายเซ็นและบริษัทของเจ้าของลายเซ็น
     * param: -
     * return: ข้้อมูลลายเซ็นและบริษัทของเจ้าของลายเซ็น
    */
    getAllSignatureWithCompany = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/signatures/company`)
        .then((response) => {
            return response.data
        })
    }

    /*
     * createWorkInfo
     * ฟังก์ชันเรียก api สำหรับสร้างข้อมูลการทำงาน
     * param: ข้อมุูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createWorkInfo = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/workinfo`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * getCompanyWithAddress
     * ฟังก์ชันเรียก api ดูข้อมูลบริษัทและที่อยู่ของบริษัท
     * param: -
     * return: ข้อมูลบริษัทและที่อยู่
    */
    getCompanyWithAddress = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/companies/address`)
        .then((response) => {
            return response.data
        })
    }

    /*
     * editSignature
     * ฟังก์ชันเรียก api แก้ไขข้อมูลลายเซ็น
     * param: ข้อมูลที่ต้องการแก้ไข, id ของลายเซ็น
     * return: สถานะการแก้ไขข้อมูล
    */
    editSignature = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/signatures/${id}`, data, { headers: {"Content-Type": "multipart/form-data"} })
            .then((response) => {
                return response.data
            })
    }

    /*
     * createAddress
     * ฟังก์ชันเรียก api สร้างข้อมูลที่อยู่
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createAddress = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/addresses`, data)
        .then((response) => {
            return response.data
        })
    }

    /*
     * getAllSignature
     * ฟังก์ชันเรียก api ดูข้อมูลทั้งหมดของลายเซ็น
     * param: -
     * return: ข้อมูลลายเซ็นทั้งหมด
    */
    getAllSignature = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/signatures`)
        .then((response) => {
            return response.data
        })
    }

    /*
     * createAddress
     * ฟังก์ชันเรียก api สร้างข้อมูลที่อยู่
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createAddress = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/addresses`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * deleteUniversity
     * ฟังก์ชันเรียก api ลบข้อมูลมหาวิทยาลัย
     * param: id มหาวิทยาลัย
     * return: สถานะการลบข้อมูล
    */
    deleteUniversity = async (id) => {
        return await axios.delete(`${import.meta.env.VITE_API_HOST}/universities/${id}`)
        .then((response) => {
            return response.data
        })
    }
    
    /*
     * getAllProject
     * ฟังก์ชันเรียก api ดูข้อมูลโปรเจกต์ทั้งหมด
     * param: ฟิลเตอร์สำหรับการค้นหา
     * return: ข้อมูลโปรเจกต์
    */
    getAllProject = async (params = {}) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/projects`, { params })
            .then((response) => {
                return response.data
            })
    }

    /*
     * getProejctInfoByInternId
     * ฟังก์ชันเรียก api ดูข้อมูลโปรเจกต์ของนักศึกษาฝึกงาน
     * param: id ของนักศึกษาฝึกงาน
     * return: ข้อมูลโปรเจกต์ของนักศึกษาฝึกงาน
    */
    getProejctInfoByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/projects/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }
    
    /*
     * getInternByProjectId
     * ฟังก์ชันเรียก api ดูข้อมูลนักศึกษาภายในโปรเจกต์
     * param: id ของโปรเจกต์
     * return: ข้อมูลนักศึกษาในโปรเจกต์
    */
    getInternByProjectId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/interns/projects/${id}`)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createProject
     * ฟังก์ชันเรียก api สร้างข้อมูลโปรเจกต์
     * param: ข้อมูลท่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createProject = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/projects`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * editProject
     * ฟังก์ชันเรียก api แก้ไขข้อมูลโปรเจกต์
     * param: ข้อมูลที่ต้องการแก้ไขและ id ของโปรเจกต์
     * return: สถานะการแก้ไขข้อมูล
    */
    editProject = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/projects/${id}`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createInternProject
     * ฟังก์ชันเรียก api สร้างข้อมูลนักศึกษาภายในโปรเจกต์
     * param: ข้อมูลที่ต้องการสร้าง
     * return: สถานะการสร้างข้อมูล
    */
    createInternProject = async (data, id) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/projects/interns/${id}`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * editInternProject
     * ฟังก์ชันเรียก api แก้ไขข้อมูลนักศึกษาภายในโปรเจกต์
     * param: ข้อมูลที่ต้องการแก้ไข และ id ของนักศึกษาฝึกงาน
     * return: สถานะการแก้ไขข้อมูล
    */
    editInternProject = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/projects/interns/${id}`, data)
            .then((response) => {
                return response.data
            })
    }

    /*
     * createCompany
     * ฟังก์ชันเรียก api สร้างข้อมูลบริษัท
     * param: ข้อมูลที่ต้องการสร้าง
     * return: ข้อมูลบริษัท
    */
    createCompany = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/companies/createCompany`, data)
            .then((response) => {
                return response
            })
    }

    /*
     * editCompany
     * ฟังก์ชันเรียก api แก้ไขข้อมูลบริษัท
     * param: ข้อมูลที่ต้องการแก้ไข, id บริษัท
     * return: สถานะการแก้ไขข้อมูล
    */
    editCompany = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/companies/${id}`, data)
            .then((response) => {
                return response
            })
    }
}