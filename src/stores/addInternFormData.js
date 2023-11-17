import { defineStore } from "pinia";
import { required, minValue, email, integer, helpers } from "@vuelidate/validators";
import { start } from "@popperjs/core";

const thaiFeedback = 'ข้อมูลต้องเป็นภาษาไทยเท่านั้น'
const numberFeedback = 'ข้อมูลต้องเป็นตัวเลขเท่านั้น'
const engFeedback = 'ข้อมูลต้องเป็นภาษาอังกฤษเท่านั้น'
const emailFeedback = 'ข้อมูลต้องอยู่ในรูปแบบอีเมล'
const requiredThai = helpers.regex(/^[ก-์]+$/)
const requiredEng = helpers.regex(/^[a-zA-Z]*$/)
const startWithZero = (value) => value[0] == '0'

export const useInternFormData = defineStore("internFormData", {
    state: () => {
        return {
            personal_info: {
                intn_code: '',
                intn_intern_email: '',
                intn_status: '',
                intn_image: '',
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
                intn_updated_by: 1,
            },

            college_info: {
                col_university_id: '',
                col_faculty_id: '',
                col_major_id: '',
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

            rules: {
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
                    intn_start_date: { required },
                    intn_intern_type: { required },
                },
                college_info: {
                    col_university_id: { required },
                    col_faculty_id: { required },
                    col_major_id: { required },
                },
                work_info: {
                    work_role_id: { required },
                    work_section_id: { required },
                    work_team_id: { required }
                },
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