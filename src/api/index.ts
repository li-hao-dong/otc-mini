
/* POST 请求 */
import type {InquiryQuoteReq, InquiryResp} from "@/interfaces/inquiry/inquiryQuote";
import type {response} from "@/interfaces/response";
import type {InquiryOptionsResp} from "@/interfaces/inquiry/inquiryOptions";
import type {InquiryHistoryResp} from "@/interfaces/inquiry/inquiryHistory";
import http from "@/utils/request/request";
import type {loginReq, loginResp} from "@/interfaces/login";
import type {UserResp} from "@/interfaces/user";
import type {calculatorReq, EquityOptionCalculatorResult} from "@/interfaces/calculator";

// MOCK API 基础地址
// const BASE_URL: string = "https://m1.apifoxmock.com/m1/7383056-7115424-default"
// const BASE_URL: string = "http://backtest.sunsmicro.com:22901/api/v1"
const BASE_URL: string = "https://option.sunsmicro.com/api/v1"

/**
 * 发起询价
 * */
export const inquiryQuote = (inquiryQuoteReq: InquiryQuoteReq): Promise<InquiryResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await  http.post(`${BASE_URL}/inquiry/quote`, inquiryQuoteReq)
            console.log("InquiryResp res", res);
            if (res.code !== 200) {
                resolve(res.data as InquiryResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch inquiryQuote info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * 登录
 * */
export const userLogin = (code: string, nickname: string):Promise<loginResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const params: loginReq = {
                password: '',
                referrer_uuid: '',
                user_name: nickname,
                wechat_login_js_code: code,
            }
            const res: response = <response>await  http.post(`${BASE_URL}/users/login`, params)
            console.log("login res", res);
            if (res.code !== 200) {
                resolve(res.data as loginResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch userLogin info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * 获取询价选项配置
 * */
export const inquiryOptions = ():Promise<InquiryOptionsResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await  http.get(`${BASE_URL}/inquiry/options`)
            console.log("InquiryOptionsResp res", res);
            if (res.code !== 200) {
                resolve(res.data as InquiryOptionsResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch inquiryOptions info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}
/**
 * 获取询价历史
 * */
export const inquiryHistory = (page: number, pageSize: number):Promise<InquiryHistoryResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/inquiry/history?page=${page}&pageSize=${pageSize}`)
            console.log("inquiryHistory res", res);
            if (res.code !== 200) {
                resolve(res.data as InquiryHistoryResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch inquiryHistory info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * 获取用户信息
 * */
export const getUserInfo = ():Promise<UserResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/users/info`)
            console.log("getUserInfo res", res);
            if (res.code !== 200) {
                resolve(res.data as UserResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch user info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}


/**
 * 计算器
 */
export const calculatorData = (payload: calculatorReq):EquityOptionCalculatorResult => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await  http.post(`${BASE_URL}/tools/equity-option/calculate`, payload)
            console.log("calculator res", res);
            if (res.code !== 200) {
                resolve(res.data.data as EquityOptionCalculatorResult)
            } else {
                reject(new Error(res.message || 'Failed to fetch calculator info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}


export const patUserInfo = (userInfo: Partial<UserResp>):Promise<UserResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.pat(`${BASE_URL}/users/info`)
            console.log("getUserInfo res", res);
            if (res.code !== 200) {
                resolve(res.data as UserResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch user info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}
