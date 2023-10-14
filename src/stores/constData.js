import { defineStore } from "pinia";

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