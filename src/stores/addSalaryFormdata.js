import { defineStore } from "pinia";
import { required } from "@vuelidate/validators";

export const useAddSalaryForm = defineStore('add_salary', {
    state: () => {
        return {
            edit_date: new Date().toLocaleDateString(),
            from_date: '',
            salary: '',

            rules: {
                edit_date: { required },
                from_date: { required },
                salary: { required },
            }
        }
    }
})