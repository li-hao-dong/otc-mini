import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({ uuid: '', name: '', token: '', token_type:'' }),
    actions: {
        setUserInfo(userInfo: {uuid: string, name: string, token: string, token_type: string}) {
            this.uuid = userInfo.uuid;
            this.name = userInfo.name;
            this.token = userInfo.token;
            this.token_type = userInfo.token_type;
            uni.setStorageSync("userInfo", userInfo);
        },
        initUserInfo() {
            const userInfo = uni.getStorageSync("userInfo");
            if (userInfo) {
                this.uuid = userInfo.uuid;
                this.name = userInfo.name;
                this.token = userInfo.token;
                this.token_type = userInfo.token_type;
            }
            // else {
            //     uni.switchTab({url: '/pages/user/user'});
            // }
        }
    }
})
