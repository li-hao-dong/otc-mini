
/* POST 请求 */
import type {InquiryQuoteReq, InquiryResp} from "@/interfaces/inquiry/inquiryQuote";
import type {response} from "@/interfaces/response";
import type {InquiryOptionsResp} from "@/interfaces/inquiry/inquiryOptions";
import type {InquiryHistoryResp} from "@/interfaces/inquiry/inquiryHistory";
import http from "@/utils/request/request";

// MOCK API 基础地址
// const BASE_URL: string = "https://m1.apifoxmock.com/m1/7383056-7115424-default"
const BASE_URL: string = "http://backtest.sunsmicro.com:22901/api/v1"

/**
 * 发起询价
 * */
export const inquiryQuote = (inquiryQuoteReq: InquiryQuoteReq): InquiryResp => {
    return new Promise(async (resolve, reject) => {
        const res: response = <response>await  http.post(`${BASE_URL}/inquiry/quote`, inquiryQuoteReq)
        console.log("InquiryResp res", res);
        if (res.code !== 200) {
            resolve(res.data as InquiryResp)
        }
    })
}
/**
 * 获取询价选项配置
 * */
export const inquiryOptions = ():InquiryOptionsResp => {
    return new Promise(async (resolve, reject) => {
        const res: response = <response>await  http.get(`${BASE_URL}/inquiry/options`)
        console.log("InquiryOptionsResp res", res);
        if (res.code !== 200) {
            resolve(res.data as InquiryOptionsResp)
        }
    })
}
/**
 * 获取询价历史
 * */
export const inquiryHistory = ():InquiryHistoryResp => {
    return new Promise(async (resolve, reject) => {
        const res: response = <response>await http.get(`${BASE_URL}/inquiry/history`)
        console.log("inquiryHistory res", res);
        if (res.code !== 200) {
            resolve(res.data as InquiryHistoryResp)
        }
    })
}
