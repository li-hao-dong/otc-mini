import {defineStore} from "pinia";
import {getUserInfo} from "@/api";
import type {UserResp} from "@/interfaces/user";

interface userStore {
    uuid: string;
    name: string;
    token: string;
    token_type: string;
    address: string;
    city: string;
    country: string;
    email: string;
    email_verified: number;
    first_name: string;
    insert_timestamp: Date|undefined;
    last_login: Date|undefined;
    last_name: string;
    phone: string;
    phone_verified: number;
    postal_code: string;
    status: string;
    update_timestamp: Date|undefined;
    user_type: string;
}

export const useUserStore = defineStore('user', {
    state: ():userStore => ({
        uuid: '',
        name: '',
        token: '',
        token_type:'',
        address: '',
        city: '',
        country: '',
        email: '',
        email_verified: 0,
        first_name: '',
        insert_timestamp: undefined,
        last_login: undefined,
        last_name: '',
        phone: '',
        phone_verified: 0,
        postal_code: '',
        status: '',
        update_timestamp: undefined,
        user_type: '',
    }),
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
                getUserInfo().then((res:UserResp) => {
                    this.address = <string>res.address;
                    this.city = <string>res.city;
                    this.country = <string>res.country;
                    this.email = <string>res.email;
                    this.email_verified = <number>res.email_verified;
                    this.first_name = <string>res.first_name;
                    this.insert_timestamp = <Date>res.insert_timestamp;
                    this.last_login = <Date>res.last_login;
                    this.last_name = <string>res.last_name;
                    this.phone = <string>res.phone;
                    this.phone_verified = <number>res.phone_verified;
                    this.postal_code = <string>res.postal_code;
                    this.status = <string>res.status;
                    this.update_timestamp = <Date>res.update_timestamp;
                    this.user_type = <string>res.user_type;
                }).catch(err => {
                    console.error("Failed to fetch user info:", err);
                })
            }
            // else {
            //     uni.switchTab({url: '/pages/user/user'});
            // }
        },
        clearUserInfo() {
            this.uuid = '';
            this.name = '';
            this.token = '';
            this.token_type = '';
            this.address = '';
            this.city = '';
            this.country = '';
            this.email = '';
            this.email_verified = 0;
            this.first_name = '';
            this.insert_timestamp = undefined;
            this.last_login = undefined;
            this.last_name = '';
            this.phone = '';
            this.phone_verified = 0;
            this.postal_code = '';
            this.status = '';
            this.update_timestamp = undefined;
            this.user_type = '';
            uni.removeStorageSync("userInfo");
        }
    }
})
