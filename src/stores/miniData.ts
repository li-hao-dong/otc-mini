import {defineStore} from "pinia";

export const useMiniDataStore = defineStore('miniData', {
    state: () => ({
        name: '机构',
    }),
})
