import { defineStore } from "pinia";

export const useInternFormData = defineStore("internFormData", {
    state: () => {
        return {
            code: '',
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
            intern_type: 'นักศึกษาฝึกงาน',
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
        setData(intern) {
            const prefixSplitted = intern.intn_prefix.split("|")
            const fnameSplitted = intern.intn_fname.split("|")
            const lnameSplitted = intern.intn_lname.split("|")
            const nicknameSplitted = intern.intn_nickname.split("|")
            this.code = intern.intn_id
            this.intern_email = intern.intn_intern_email
            this.status = intern.intn_work_status
            this.role = intern.work_infos[0]?.work_role
            this.prefix = [prefixSplitted[0], prefixSplitted[1]]
            this.fname = [fnameSplitted[0], fnameSplitted[1]]
            this.lname = [lnameSplitted[0], lnameSplitted[1]]
            this.nickname = [nicknameSplitted[0], nicknameSplitted[1]]
            this.citizen_id = intern.intn_citizen_id
            this.birth_date = intern.intn_birth_date
            this.gender = intern.intn_gender
            this.blood_type = intern.intn_blood_type
            this.weight = intern.intn_weight
            this.height = intern.intn_height
            this.nationality = intern.intn_nationality
            this.nation = intern.intn_nation
            this.religion = intern.intn_religion
            this.university = intern.college_info?.col_uni?.uni_name
            this.faculty = intern.college_info?.col_faculty
            this.major = intern.college_info?.col_major
            this.martial_status = intern.intn_martial_status
            this.military_status = intern.intn_military_status
            this.reason = intern.intn_reason
            this.house_number = intern.intn_address.addr_house_number
            this.village_number = intern.intn_address.addr_village_number
            this.alley = intern.intn_address.addr_alley
            this.street = intern.intn_address.addr_street
            this.subdistrict = intern.intn_address.addr_subdistrict
            this.district = intern.intn_address.addr_district
            this.province = intern.intn_address.addr_province
            this.post_code = intern.intn_address.addr_post_code
            this.tel = intern.intn_tel
            this.email = intern.intn_email
            this.intern_type = intern.intn_intern_type
            this.contract_number = intern.intn_contract_num
            this.start_date = intern.intn_start_date
            this.end_date = intern.intn_end_date
            this.last_work_date = intern.intn_last_word_date
            this.contract_end_date = intern.intn_contract_end_date
            this.mentor = intern.intn_mentor.ment_name
            this.section = intern.work_infos[0]?.work_sec
            this.department = intern.work_infos[0]?.work_dept?.dept_name
            
        }
    },
    getters: {

    },
});