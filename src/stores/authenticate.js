import { defineStore } from "pinia";

export const useAuthenticate = defineStore('authenticate', {
    state: () => {
        return {
            user_id: '',
            user_name: '',
            user_token: '',
        }
    },

    actions: {
        setData(data) {
            this.user_id = data.user_id
            this.user_name= data.user_name
            this.user_token = data.token
        },

        isAuthenticate() {
            return (this.user_id &&
                    this.user_name &&
                    this.user_token) ? true : false
        },
    },

    getters: {
        getId() {
            return this.user_id
        },

        getName() {
            return this.user_name
        },

        getToken() {
            return this.user_token
        }
    },

    persist: true,
})