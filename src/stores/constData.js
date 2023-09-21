import { defineStore } from "pinia";

export const userPrefixData = defineStore('prefix', {
    state: () => {
        return [
            'นาย',
            'นาง',
            'นางสาว'
        ]
    }
})

export const useStatusData = defineStore('status', {
    state: () => {
        return [
            'กำลังทำงาน',
            'พ้นสภาพ'
        ]
    }
})

export const useInternType = defineStore('internType', {
    state: () => {
        return [
            'นักศึกษาฝึกงาน',
            'พนักงานประจำ',
            'พนักงานพาร์ทไทม์'
        ]
    }
})

export const useGenderData = defineStore('gender', {
    state: () => {
        return [
            'ชาย',
            'หญิง',
            'ไม่ระบุ'
        ]
    }
})

export const useMilitaryStatus = defineStore('militaryStatus', {
    state: () => {
        return [
            'ยังไม่เกณฑ์ทหาร',
            'กำลังประจำกองทหาร',
            'ผ่านการเกณฑ์ทหารมาแล้ว',
            'ได้รับการยกเว้นการเกณฑ์ทหาร'
        ]
    }
})

export const useMartialStatus = defineStore('martialStatus', {
    state: () => {
        return [
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
})