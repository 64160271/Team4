import { defineStore } from "pinia";
import { slashDtoDashY } from "../assets/js/func";

export const useBloodType = defineStore('blood_type', {
    state: () => {
        return {
            list: [
                'A', 'B', 'AB', 'O'
            ]
        }
    }
})

export const usePrefixData = defineStore('prefix', {
    state: () => {
        return {
            list: [
                ['นาย', 'Mr.'],
                ['นาง', 'Mrs.'],
                ['นางสาว', 'Ms.']
            ]
        }

    }
})

export const useStatusData = defineStore('status', {
    state: () => {
        return {
            list: [
                'กำลังทำงาน',
                'พ้นสภาพ'
            ]
        }
    }
})

export const useInternType = defineStore('internType', {
    state: () => {
        return {
            list: [
                'นักศึกษาฝึกงาน',
                'พนักงานประจำ',
                'พนักงานพาร์ทไทม์'
            ]
        }
    }
})

export const useGenderData = defineStore('gender', {
    state: () => {
        return {
            list: [
                'ชาย',
                'หญิง',
                'ไม่ระบุ'
            ]
        }
    }
})

export const useMilitaryStatus = defineStore('militaryStatus', {
    state: () => {
        return {
            list: [
                'ยังไม่เกณฑ์ทหาร',
                'กำลังประจำกองทหาร',
                'ผ่านการเกณฑ์ทหารมาแล้ว',
                'ได้รับการยกเว้นการเกณฑ์ทหาร'
            ]
        }
    }
})

export const useMartialStatus = defineStore('martialStatus', {
    state: () => {
        return {
            list: [
                'โสด',
                'มีแฟนแล้ว',
                'หมั้น',
                'สมรส',
                'แยกกันอยู่',
                'หย่าร้าง',
                'หม้าย',
                'ซับซ้อน'
            ]
        }
    }
})

export const useInternName = defineStore('internName', {
    state: () => {
        return {
            intn_code: '',
            intn_name: '',
            intn_image_path: '',
            intn_id: '',
            intn_role: '',
            intn_section: '',
            intn_department: '',
            intn_start_date: ''
        }
    },

    actions: {
        setData(data) {
            this.intn_code = data.intn_code
            this.intn_image_path = data?.intn_image_path
            this.intn_name = data.intn_name_th
            this.intn_id = data.intn_id
            this.intn_role = data.work_infos[0]?.work_role.role_name
            this.intn_section = data.work_infos[0]?.work_section.sec_name
            this.intn_department = data.work_infos[0]?.work_department?.dept_name
            this.intn_start_date = data.intn_start_date
        }
    },

    getters: {
        getId() {
            return this.intn_id
        },

        getName() {
            return this.intn_name
        },

        getRole() {
            return this.intn_role
        },

        getSection() {
            return this.intn_section
        },

        getDepartment() {
            return this.intn_department
        },

        getStartDate() {
            return slashDtoDashY(this.intn_start_date)
        }
    }
})

export const useLeavesType = {
    list: [
        { value: 1, text: 'ลาป่วย' },
        { value: 2, text: 'ลาคลอดบุตร' },
        { value: 3, text: 'ลาไปช่วยเหลือภริยาที่คลอดบุตร' },
        { value: 4, text: 'ลากิจส่วนตัว' },
        { value: 5, text: 'ลาพักผ่อน' },
        { value: 6, text: 'ลาอุปสมบทหรือการลาไปประกอบพิธีฮัจย์' },
        { value: 7, text: 'ลาเข้ารับการตรวจเลือกหรือเข้ารับการเตรียมพล' },
        { value: 8, text: 'ลาไปศึกษา ฝึกอบรม ปฏิบัติการวิจัย หรือดูงาน' },
        { value: 9, text: 'ลาไปปฏิบัติงานในองค์การระหว่างประเทศ' },
        { value: 10, text: 'ลาติดตามคู่สมรส' },
        { value: 11, text: 'ลาไปฟื้นฟูสมรรถภาพด้านอาชีพ' },
    ]
}