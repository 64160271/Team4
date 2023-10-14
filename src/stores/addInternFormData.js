import { defineStore } from "pinia";

export const useInternFormData = defineStore("internFormData", {
    state: () => {
        return {
            code: '',
            intern_email: '',
            status: '',
            role: '',
            image: '',
            prefix_th: '',
            prefix_en: '',
            fname_th: '',
            fname_en: '',
            lname_th: '',
            lname_en: '',
            nickname_th: '',
            nickname_en: '',
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
            intern_type: 'นักศึกษาฝึกงาน',
            contract_number: '',
            start_date: '',
            end_date: '',
            last_work_date: '',
            contract_end_date: '',
            mentor: '',
            section: '',
            department: '',

            /* personal_info: {
                intern_email: '',
                status: '',
                image: '',
                prefix_th: '',
                prefix_en: '',
                fname_th: '',
                fname_en: '',
                lname_th: '',
                lname_en: '',
                nickname_th: '',
                nickname_en: '',
                citizen_id: '',
                birth_date: '',
                gender: '',
                blood_type: '',
                weight: Number(0),
                height: Number(0),
                nationality: '',
                nation: '',
                religion: '',
                martial_status: '',
                age: Number(0),
                military_status: '',
                reason: '',
                tel: '',
                email: '',
                intern_type: 'นักศึกษาฝึกงาน',
                contract_number: '',
                start_date: '',
                end_date: '',
                last_work_date: '',
                contract_end_date: '',
                mentor_id: '',
            },

            college_info: {
                university: '',
                faculty: '',
                major: '',
            },

            work_info: {
                role: '',
                section: '',
                department: '',
            },

            address: {
                house_number: '',
                village_number: '',
                alley: '',
                street: '',
                subdistrict: '',
                district: '',
                province: '',
                post_code: '',
            } */
        };
    },

    persist: true,

    actions: {
        setData(intern) {

            this.code = intern.intn_code
            this.intern_email = intern.intn_intern_email
            this.status = intern.intn_work_status
            this.role = intern.work_infos[0]?.work_role_id
            this.prefix_th = intern.prefix_th
            this.prefix_en = intern.prefix_en
            this.fname_th = intern.fname_th
            this.fname_en = intern.fname_en
            this.lname_th = intern.lname_th
            this.lname_en = intern.lname_en
            this.nickname_th = intern.nickname_th
            this.nickname_en = intern.nickname_en
            this.citizen_id = intern.intn_citizen_id
            this.birth_date = intern.intn_birth_date
            this.gender = intern.intn_gender
            this.blood_type = intern.intn_blood_type
            this.weight = intern.intn_weight
            this.height = intern.intn_height
            this.nationality = intern.intn_nationality
            this.nation = intern.intn_nation
            this.religion = intern.intn_religion
            this.university = intern.college_info?.col_uni_id
            this.faculty = intern.college_info?.col_faculty_id
            this.major = intern.college_info?.col_major_id
            this.martial_status = intern.intn_martial_status
            this.military_status = intern.intn_military_status
            this.reason = intern.intn_reason
            this.house_number = intern.intn_address?.addr_house_number
            this.village_number = intern.intn_address?.addr_village_number
            this.alley = intern.intn_address?.addr_alley
            this.street = intern.intn_address?.addr_street
            this.subdistrict = intern.intn_address?.addr_subdistrict
            this.district = intern.intn_address?.addr_district
            this.province = intern.intn_address?.addr_province
            this.post_code = intern.intn_address?.addr_post_code
            this.tel = intern.intn_tel
            this.email = intern.intn_email
            this.intern_type = intern.intn_intern_type
            this.contract_number = intern.intn_contract_num
            this.start_date = intern.intn_start_date
            this.end_date = intern.intn_end_date
            this.last_work_date = intern.intn_last_work_date
            this.contract_end_date = intern.intn_contract_end_date
            this.mentor = intern.intn_mentor.ment_id
            this.section = intern.work_infos[0]?.work_sec_id
            this.department = intern.work_infos[0]?.work_dept?.dept_name
        },

        reset() {
            Object.assign(this, defaultState);
        }
    },
    getters: {

    },
});