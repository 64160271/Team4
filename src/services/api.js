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

    createIntern = async (data) => {
        await axios.post(`${import.meta.env.VITE_API_HOST}/interns`, data)
            .then((response) => console.log(response)).then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'บันทึกข้อมูลเสร็จสิ้น',
                    showConfirmButton: false,
                    timer: 3000
                }).then(() => {
                    
                })
            })
    }

}