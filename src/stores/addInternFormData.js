import { defineStore } from "pinia";

export const useInternFormData = defineStore("internFormData", {
    state: () => {
        return {
            id: '',
            intern_email: '',
            status: '',
            role: '',
            image: '',
            prefix: ['', ''],
            fname: ['', ''],
            lname: ['', ''],
            nickname: ['', ''],
            citizen_id: '',
            birth_date: '',
            gender: '',
            blood_type: '',
            weight: Number(0),
            height: Number(0),
            nationality: '',
            nation: '',
            religion: '',
            university: '',
            faculty: '',
            major: '',
            martial_status: '',
            age: Number(0),
            military_status: '',
            reason: '',
            house_number: '',
            village_number: '',
            alley: '',
            street: '',
            subdistrict: '',
            district: '',
            province: '',
            post_code: '',
            tel: '',
            email: '',
            intern_type: '',
            contract_number: '',
            start_date: '',
            end_date: '',
            last_work_date: '',
            contract_end_date: '',
            mentor: '',
            section: '',
            department: '',
            
        };
    },
    actions: {

    },
    getters: {

    },
});