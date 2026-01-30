import {defineStore} from "pinia";

export const useMiniDataStore = defineStore('miniData', {
    state: () => ({
        name: '机构',
        channelFee: 5000, // 通道费用
        waitPriceHint: '(待报价)'
    }),
})
