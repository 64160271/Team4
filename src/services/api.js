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
}