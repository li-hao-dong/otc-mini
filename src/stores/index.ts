import { defineStore } from 'pinia'
import {useUserStore} from "@/stores/userStore";
import {useMiniDataStore} from "@/stores/miniData";

export const useStore = defineStore('store', {
    state: () => {
        return {
            miniData: useMiniDataStore(),
            user: useUserStore()
        }
    },
})
