import axios from 'axios'

export default class apiService {

    getAllUniversity = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/universities`)
            .then((response) => {
                return response.data
            })
    }

    getAllFaculty = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/faculties`)
            .then((response) => {
                return response.data
            })
    }

    getAllMajor = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/majors`)
            .then((response) => {
                return response.data
            })
    }

    getFacultyByUniversityId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/faculties/university/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getMajorByFacultyId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/majors/faculty/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getAllSection = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/sections`)
            .then((response) => {
                return response.data
            })
    }

    getMentorBySectionId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/mentors/section/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getMentorByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/mentors/intern/${id}`)
            .then((resposne) => {
                return resposne.data
            })
    }

    getDepartmentBySectionId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/departments/section/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getAllTeam = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/teams`)
            .then((response) => {
                return response.data
            })
    }

    getTeamBySectionId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/teams/section/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getSectionWithMentor = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/sections/mentors`)
            .then((response) => {
                return response.data
            })
    }

    getAllRole = async (params) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/roles`, { params: params })
            .then((response) => {
                return response.data
            })
    }

    getInternById = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getAllSectionWithRelated = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/sections/related`)
            .then((response) => {
                return response.data
            })
    }

    getAllUniversityWithRelated = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/universities/related`)
            .then((response) => {
                return response.data
            })
    }

    getAllCompany = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/companies`)
            .then((response) => {
                return response.data
            })
    }

    createIntern = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/interns`, data, { headers: {"Content-Type": "multipart/form-data"} })
            .then((response) => {
                return response.data
            })
    }

    editInternData = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/interns/${id}`, data, { headers: {"Content-Type": "multipart/form-data"} })
            .then((response) => {
                return response.data
            })
    }

    getSalaryByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getLeaveInfoByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/leavesinfo/interns/${id}`)
            .then((response) => {
                return response.data
            })
    }

    createLeaveInfo = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/leavesinfo`, data, { headers: { "Content-Type": "multipart/form-data" } })
            .then((response) => {
                return response.data
            })
    }

    getWorkInfoByInternId = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/workinfo/intern/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getLeaveInfoFile = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/leavesinfo/file/${id}`)
            .then((response) => {
                return response.data
            })
    }

    getDocumentByInternId = async (id, params = '') => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/documents/intern/${id}`, { params: params })
            .then((response) => {
                return response.data
            })
    }

    getDocumentFile = async (id) => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/documents/file/${id}`)
            .then((response) => {
                return response.data
            })
    }

    createDocument = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/documents`, data, { headers: {"Content-Type": "multipart/form-data"} })
            .then((response) => {
                return response.data
            })
    }

    deleteDocument = async (id) => {
        return await axios.delete(`${import.meta.env.VITE_API_HOST}/documents/${id}`)
            .then((response) => {
                return response.data
            })
    }

    createSalaryData = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/salaries`, data)
            .then((response) => {
                return response.data
            })
    }

    createSignature = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/signatures`, data, { headers: {"Content-Type": "multipart/form-data"} })
            .then((response) => {
                return response.data
            })
    }
    
    createWorkInfo = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/workinfo`, data)
            .then((response) => {
                return response.data
            })
    }

    getAllSignature = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/signatures`)
            .then((response) => {
                return response.data
            })
    }

    getAllSignatureWithCompany = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/signatures/company`)
            .then((response) => {
                return response.data
            })
    }
}