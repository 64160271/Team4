import { defineStore } from "pinia";

export const useCompanyStore = defineStore("company", {
    state: () => {
        return {
            id: '',
            emp_email: '',
            status: {
                name: ''
            },
            role: '',
            img: '',

            /* prefix: ['', ''],
            fname: ['', ''],
            lname: ['', ''],
            nickname: ['', ''],
            citizen_id: '',
            birth_date: '',
            gender: {
                name: ''
            },
            blood_type: '',
            weight: '',
            height: '',
            nationality: '',
            nation: '',
            religion: '',
            university: '',
            faculty: '',
            major: '',
            martial_status: {
                name: ''
            },
            age: Number(0),
            military_status: {
                name: ''
            },
            reason: '', */

            /* house_number: '',
            village_number: Number(),
            alley: '',
            street: '',
            subdistrict: '',
            district: '',
            province: '',
            post_code: Number(),
            tel: '',
            email: '', */

            /* emp_type: {
                name: ''
            },
            contract_number: '',
            start_date: '',
            last_work_date: '',
            contract_end_date: '',
            mentor: '',
            section: '',
            department: '', */
        };
    },
    actions: {

    },
    getters: {

    },
});

export const usePersonalStore = defineStore('personal', {
    state: () => {
        return {
            prefix: ['', ''],
            fname: ['', ''],
            lname: ['', ''],
            nickname: ['', ''],
            citizen_id: '',
            birth_date: '',
            gender: {
                name: ''
            },
            blood_type: '',
            weight: Number(0),
            height: Number(0),
            nationality: '',
            nation: '',
            religion: '',
            university: '',
            faculty: '',
            major: '',
            martial_status: {
                name: ''
            },
            age: Number(0),
            military_status: {
                name: ''
            },
            reason: '',
        }
    }
})

export const useAddressStore = defineStore('address', {
    state: () => {
        return {
            house_number: '',
            village_number: Number(0),
            alley: '',
            street: '',
            subdistrict: '',
            district: '',
            province: '',
            post_code: Number(0),
            tel: '',
            email: '',
        }
    }
})

export const useContractStore = defineStore('contract', {
    state: () => {
        return {
            emp_type: {
                name: ''
            },
            contract_number: '',
            start_date: '',
            last_work_date: '',
            contract_end_date: '',
            mentor: '',
            section: '',
            department: '',
        }
    }
})