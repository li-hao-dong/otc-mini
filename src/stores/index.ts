import { defineStore } from 'pinia'
import {useUserStore} from "@/stores/userStore";

export const useStore = defineStore('store', {
    state: () => {
        return {
            user: useUserStore()
        }
    },
})
