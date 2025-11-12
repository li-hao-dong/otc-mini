import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({ id: 1, name: 'Eduardo' }),
})
