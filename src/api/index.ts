
/* POST 请求 */
import type {InquiryQuoteReq, InquiryResp} from "@/interfaces/inquiry/inquiryQuote";
import type {response} from "@/interfaces/response";
import type {InquiryOptionsResp} from "@/interfaces/inquiry/inquiryOptions";
import type {InquiryHistoryResp} from "@/interfaces/inquiry/inquiryHistory";
import http from "@/utils/request/request";

// MOCK API 基础地址
const BASE_URL = "https://m1.apifoxmock.com/m1/7383056-7115424-default"

/**
 * 发起询价
 * */
const inquiryQuote = (inquiryQuoteReq:InquiryQuoteReq) => {
    http.post("/inquiry/quote", {inquiryQuoteReq})?.then(response => {
        console.log("inquiryQuoteReq", inquiryQuoteReq);
        const res: response = {
            code: 200,
            message: "success",
            requestId: "1234567890",
            timestamp: new Date(),
            data: {
                currentPrice: 10.0,
                inquiryId: "1234567890",
                inquiryTime: new Date(),
                nominalAmount: 100.0,
                priceChange: "10.0",
                results: [
                    {
                        quotes: [
                            {
                                isAvailable: true,
                                isRecommended: true,
                                price: 10.0,
                                productCode: "1234567890",
                                sourceCode: "1234567890",
                                sourceName: "1234567890",
                            },
                        ],
                        structure: "1234567890",
                        structureName: "1234567890",
                    }
                ]
            } as InquiryResp
        }
        return res
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
