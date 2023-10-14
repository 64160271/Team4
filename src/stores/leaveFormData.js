import { defineStore } from "pinia";
import { required, minValue } from "@vuelidate/validators";

export const useLeaveFormData = defineStore('leave_data', {
    state: () => {
        return {
            write_date: '',
            title: '',
            leave_date: '',
            to: '',
            type: '',
            filename: '',
            format: '',
            from_time: '',
            to_time: '',

            /* rules: {
                from_date: { required },
                edit_date: { required },
                salary: { 
                    required,
                    minValueValue: minValue(1) 
                },
            } */
        }
    }
})