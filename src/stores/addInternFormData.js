import { defineStore } from "pinia";
import { required, minValue, email, integer, helpers } from "@vuelidate/validators";
import { getAge, formatDate } from "../assets/js/func";
import { slashDtoDashY } from "../assets/js/func";

const workStat = {
    'พ้นสภาพ': 0,
    'กำลังทำงาน': 1,
}

export const useInternFormData = defineStore("internFormData", {
    state: () => {
        return {
            intn_image: '',
            personal_info: {
                intn_code: '',
                intn_intern_email: null,
                intn_status: '',
                intn_prefix_th: '',
                intn_prefix_en: '',
                intn_fname_th: '',
                intn_fname_en: null,
                intn_lname_th: '',
                intn_lname_en: null,
                intn_nickname_th: '',
                intn_nickname_en: null,
                intn_citizen_id: null,
                intn_birth_date: null,
                intn_gender: '',
                intn_blood_type: null,
                intn_weight: Number(0),
                intn_height: Number(0),
                intn_nationality: null,
                intn_nation: null,
                intn_religion: null,
                intn_martial_status: null,
                intn_age: Number(0),
                intn_military_status: null,
                intn_reason: null,
                intn_tel: '',
                intn_email: '',
                intn_intern_type: 'นักศึกษาฝึกงาน',
                intn_contract_num: null,
                intn_start_date: '',
                intn_end_date: null,
                intn_last_work_date: null,
                intn_bank_name: null,
                intn_bank_account: null,
                intn_contract_end_date: '',
                intn_mentor_id: '',
                intn_major_id: '',
                intn_updated_by: 1,
            },

            college_info: {
                col_university_id: '',
                col_faculty_id: '',
            },

            work_info: {
                work_role_id: '',
                work_section_id: '',
                work_department_id: '',
                work_team_id: '',
            },

            address: {
                addr_house_number: null,
                addr_village_number: null,
                addr_alley: null,
                addr_street: null,
                addr_subdistrict: null,
                addr_district: null,
                addr_province: null,
                addr_post_code: null,
            },

            sectionsForm: {
                section: ''
            },
            universitiesForm: {
                university: '',
                faculty: '',
            },
        };
    },

    actions: {
        setData(intern) {
            this.personal_info.intn_code = intern.intn_code.split('-')[1]
            this.personal_info.intn_intern_email = intern.intn_intern_email?.split('@')[0] || ''
            this.personal_info.intn_work_status = workStat[intern.intn_work_status]
            this.personal_info.intn_prefix_th = intern.intn_prefix_th
            this.personal_info.intn_prefix_en = intern.intn_prefix_en
            this.personal_info.intn_fname_th = intern.intn_fname_th
            this.personal_info.intn_fname_en = intern.intn_fname_en
            this.personal_info.intn_lname_th = intern.intn_lname_th
            this.personal_info.intn_lname_en = intern.intn_lname_en
            this.personal_info.intn_nickname_th = intern.intn_nickname_th
            this.personal_info.intn_nickname_en = intern.intn_nickname_en
            this.personal_info.intn_citizen_id = intern.intn_citizen_id
            this.personal_info.intn_birth_date = slashDtoDashY(intern.intn_birth_date)
            this.personal_info.intn_gender = intern.intn_gender
            this.personal_info.intn_blood_type = intern.intn_blood_type
            this.personal_info.intn_weight = intern.intn_weight
            this.personal_info.intn_height = intern.intn_height
            this.personal_info.intn_nationality = intern.intn_nationality
            this.personal_info.intn_nation = intern.intn_nation
            this.personal_info.intn_religion = intern.intn_religion
            this.college_info.col_university_id = intern.intn_major?.maj_faculty?.fac_university?.uni_id
            this.college_info.col_faculty_id = intern.intn_major?.maj_faculty?.fac_id
            this.personal_info.intn_martial_status = intern.intn_martial_status
            this.personal_info.intn_military_status = intern.intn_military_status
            this.personal_info.intn_reason = intern.intn_reason
            this.address.addr_house_number = intern.intn_address?.addr_house_number
            this.address.addr_village_num = intern.intn_address?.addr_village_number
            this.address.addr_alley = intern.intn_address?.addr_alley
            this.address.addr_street = intern.intn_address?.addr_street
            this.address.addr_subdistrict = intern.intn_address?.addr_subdistrict
            this.address.addr_district = intern.intn_address?.addr_district
            this.address.addr_province = intern.intn_address?.addr_province
            this.address.addr_post_code = intern.intn_address?.addr_post_code
            this.personal_info.intn_tel = intern.intn_tel
            this.personal_info.intn_email = intern.intn_email
            this.personal_info.intn_intern_type = intern.intn_intern_type
            this.personal_info.intn_contract_number = intern.intn_contract_num
            this.personal_info.intn_start_date = slashDtoDashY(intern.intn_start_date)
            this.personal_info.intn_end_date = slashDtoDashY(intern.intn_end_date)
            this.personal_info.intn_last_work_date = slashDtoDashY(intern.intn_last_work_date)
            this.personal_info.intn_contract_end_date = slashDtoDashY(intern.intn_contract_end_date)
            this.personal_info.intn_mentor_id = intern.intn_mentor.ment_id
            this.personal_info.intn_major_id = intern.intn_major.maj_id
            this.work_info.work_role_id = intern.work_infos[0]?.work_role.role_id
            this.work_info.work_section_id = intern.work_infos[0]?.work_section.sec_id
            this.work_info.work_department_id = intern.work_infos[0]?.work_department?.dept_id
            this.work_info.work_team_id = intern.work_infos[0]?.work_team?.team_id
            this.personal_info.intn_bank_account = intern.intn_bank_account,
            this.personal_info.intn_bank_name = intern.intn_bank_name
        },

        reset() {
            Object.assign(this, defaultState);
        }
    },

    getters: {
        getStartDate() {
            return this.personal_info.intn_start_date
        },
    }
});


const thaiFeedback = 'ข้อมูลต้องเป็นภาษาไทยเท่านั้น'
const numberFeedback = 'ข้อมูลต้องเป็นตัวเลขเท่านั้น'
const engFeedback = 'ข้อมูลต้องเป็นภาษาอังกฤษเท่านั้น'
const emailFeedback = 'ข้อมูลต้องอยู่ในรูปแบบอีเมล'
const ageFeedback = 'อายุขั้นต่ำ 18 ปี'
const citizenFeedback = ['ข้อมูลควรเป็นตัวเลขหรือตัวอักษรเท่านั้น', 'ข้อมูลควรมีความยาว 7-9 หรือ 13 ตัวอักษร']
const afterStartFeedback = 'ไม่สามารถเลือกก่อนวันเริ่มต้นฝึกงานได้'

const dateAfterStart = (v) => {
    if (v) {
        let date = useInternFormData().getStartDate
        return (v > date)
    }
    return true
}
const citizenLength = (v) => v ? (v.length == 13 || v.length == 7 || v.length == 8 || v.length == 9) : true
const engAndNumber = helpers.regex(/^[a-zA-Z0-9]*$/) 
const requiredThai = helpers.regex(/^[ก-์]+$/)
const requiredEng = helpers.regex(/^[a-zA-Z]*$/)
const startWithZero = (value) => value[0] == '0'
const checkAge = (value) => {
    if (value) {
        return (getAge(value) > 18)
    }
    return true
}

export const addInternFormRules =  {
    personal_info: {
        intn_code: {
            required,
            integer: helpers.withMessage(numberFeedback, integer)
        },
        intn_work_status: { required },
        intn_mentor_id: { required },
        intn_prefix_th: { required },
        intn_fname_th: {
            required,
            requiredThai: helpers.withMessage(thaiFeedback, requiredThai)
        },
        intn_lname_th: {
            required,
            requiredThai: helpers.withMessage(thaiFeedback, requiredThai),
        },
        intn_nickname_th: {
            required,
            requiredThai: helpers.withMessage(thaiFeedback, requiredThai)
        },
        intn_fname_en: {
            requiredEng: helpers.withMessage(engFeedback, requiredEng)
        },
        intn_lname_en: {
            requiredEng: helpers.withMessage(engFeedback, requiredEng)
        },
        intn_nickname_en: {
            requiredEng: helpers.withMessage(engFeedback, requiredEng)
        },
        intn_gender: { required },
        intn_tel: {
            required,
            integer: helpers.withMessage(numberFeedback, integer),
            startWithZero: helpers.withMessage('ข้อมูลต้องอยู่ในรูปแบบเบอร์โทรศัพท์', startWithZero)
        },
        intn_email: {
            required,
            email: helpers.withMessage(emailFeedback, email)
        },
        intn_birth_date: {
            checkAge: helpers.withMessage(ageFeedback, checkAge)
        },
        intn_citizen_id: {
            engAndNumber: helpers.withMessage(citizenFeedback[0], engAndNumber),
            citizenLength: helpers.withMessage(citizenFeedback[1], citizenLength)
        },
        intn_start_date: { required },
        intn_last_work_date: {
            dateAfterStart: helpers.withMessage(afterStartFeedback, dateAfterStart)
        },
        intn_end_date: {
            dateAfterStart: helpers.withMessage(afterStartFeedback, dateAfterStart)
        },
        intn_contract_end_date: { 
            required,
            dateAfterStart: helpers.withMessage(afterStartFeedback, dateAfterStart)
        },
        intn_intern_type: { required },
        intn_major_id: { required },
    },
    college_info: {
        col_university_id: { required },
        col_faculty_id: { required },
    },
    work_info: {
        work_role_id: { required },
        work_section_id: { required },
        work_team_id: { required }
    },
}