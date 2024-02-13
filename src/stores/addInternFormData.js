import { defineStore } from "pinia";
import { required, minValue, email, integer, helpers } from "@vuelidate/validators";
import { getAge, formatDate } from "../assets/js/func";
import { slashDtoDashY } from "../assets/js/func";

const thaiFeedback = 'ข้อมูลต้องเป็นภาษาไทยเท่านั้น'
const numberFeedback = 'ข้อมูลต้องเป็นตัวเลขเท่านั้น'
const engFeedback = 'ข้อมูลต้องเป็นภาษาอังกฤษเท่านั้น'
const emailFeedback = 'ข้อมูลต้องอยู่ในรูปแบบอีเมล'
const ageFeedback = 'อายุขั้นต่ำ 18 ปี'

const requiredThai = helpers.regex(/^[ก-์]+$/)
const requiredEng = helpers.regex(/^[a-zA-Z]*$/)

const startWithZero = (value) => value[0] == '0'
const checkAge = (value) => {
    if (value) {
        return (getAge(value) > 18)
    }
    return true
}

export const useInternFormData = defineStore("internFormData", {
    state: () => {
        return {
            intn_image: '',
            personal_info: {
                intn_code: '',
                intn_intern_email: '',
                intn_status: '',
                intn_prefix_th: '',
                intn_prefix_en: '',
                intn_fname_th: '',
                intn_fname_en: '',
                intn_lname_th: '',
                intn_lname_en: '',
                intn_nickname_th: '',
                intn_nickname_en: '',
                intn_citizen_id: '',
                intn_birth_date: '',
                intn_gender: '',
                intn_blood_type: '',
                intn_weight: Number(0),
                intn_height: Number(0),
                intn_nationality: '',
                intn_nation: '',
                intn_religion: '',
                intn_martial_status: '',
                intn_age: Number(0),
                intn_military_status: '',
                intn_reason: '',
                intn_tel: '',
                intn_email: '',
                intn_intern_type: 'นักศึกษาฝึกงาน',
                intn_contract_number: '',
                intn_start_date: '',
                intn_end_date: '',
                intn_last_work_date: '',
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
                addr_house_number: '',
                addr_village_number: '',
                addr_alley: '',
                addr_street: '',
                addr_subdistrict: '',
                addr_district: '',
                addr_province: '',
                addr_post_code: '',
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
            this.personal_info.intn_intern_email = intern.intn_intern_email || ''
            this.personal_info.intn_work_status = intern.intn_work_status
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
            this.address.addr_village_number = intern.intn_address?.addr_village_number
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
        },

        reset() {
            Object.assign(this, defaultState);
        }
    },
});

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
        intn_start_date: { required },
        intn_contract_end_date: { required },
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
