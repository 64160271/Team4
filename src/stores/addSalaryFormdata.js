import { defineStore } from "pinia";

export const useAddSalaryForm = defineStore('add_salary', {
    state: () => {
        return {
            edit_date: new Date().toLocaleDateString(),
            from_date: '',
            salary: '',
        }
    }
})