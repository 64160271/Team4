import { defineStore } from "pinia";
import { required, minValue } from "@vuelidate/validators";

export const useAddSalaryForm = defineStore('add_salary', {
    state: () => {
        return {
            edit_date: '',
            from_date: '',
            salary: '',

            rules: {
                from_date: { required },
                salary: { 
                    required,
                    minValueValue: minValue(1) 
                },
            }
        }
    }
})