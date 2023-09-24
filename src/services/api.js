import axios from 'axios'

export default class apiService {

    getAllUniversity = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/universities`)
            .then((response) => {
                return response.data
            })
    }

    getAllFaculty = async () => {
        await axios.get(`${import.meta.env.VITE_API_HOST}/faculties`)
            .then((response) => {
                return response.data
            })
    }

    getAllMajor = async () => {
        await axios.get(`${import.meta.env.VITE_API_HOST}/majors`)
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

    getAllRole = async () => {
        return await axios.get(`${import.meta.env.VITE_API_HOST}/roles`)
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

    createIntern = async (data) => {
        return await axios.post(`${import.meta.env.VITE_API_HOST}/interns/key`, data)
            .then((response) => {
                return response
            })
    }

    editInternData = async (data, id) => {
        return await axios.put(`${import.meta.env.VITE_API_HOST}/interns/${id}`, data)
            .then((response) => {
                return response.data
            })
    }

}