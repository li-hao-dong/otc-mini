import {defineStore} from "pinia";

export const useMiniDataStore = defineStore('miniData', {
    state: () => ({
        name: '机构',
        channelFee: 3000, // 通道费用
        waitPriceHint: '(待报价)',
        orderPlacementTabIndex: 0,
        groupPeople: 0,
    }),
})
