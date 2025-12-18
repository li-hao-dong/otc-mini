
/* POST 请求 */
import type {InquiryQuoteReq, InquiryResp} from "@/interfaces/inquiry/inquiryQuote";
import type {response} from "@/interfaces/response";
import type {InquiryOptionsResp} from "@/interfaces/inquiry/inquiryOptions";
import type {InquiryHistoryResp} from "@/interfaces/inquiry/inquiryHistory";
import http from "@/utils/request/request";
import type {loginReq, loginResp} from "@/interfaces/login";
import type {UserResp} from "@/interfaces/user";
import type {calculatorReq, EquityOptionCalculatorResult} from "@/interfaces/calculator";
import type { orderPayloadReq, orderPayloadResp, PriceType } from "@/interfaces/inquiry/orderPayload";
import type { userOrderResp } from "@/interfaces/orders";
import type {OrderDetail} from "@/interfaces/orderDetail";
import type {BankAccountInfoResp} from "@/interfaces/bankData";
import type {UploadImageReq, UploadImageResp} from "@/interfaces/uploadImage";
import type {PaymentProofInfoResp} from "@/interfaces/paymentProofInfo";
import type {ExerciseReq, ExerciseResp} from "@/interfaces/exercise";
import type {subscribeMessageResp} from "@/interfaces/subscribeMessage";

// MOCK API 基础地址
// const BASE_URL: string = "https://m1.apifoxmock.com/m1/7383056-7115424-default"
// const BASE_URL: string = "http://backtest.sunsmicro.com:22901/api/v1"
export const BASE_URL: string = "https://option.sunsmicro.com/api/v1"

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
 * 用户下单
 * */
export const buyProduct = ( inquiryId: string, productCode: string, priceType: PriceType, quantity: number, limitPrice: number ):Promise<orderPayloadResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload:orderPayloadReq = {
                inquiryId: inquiryId,
                selectedQuote: {
                    productCode: productCode
                },
                priceType:priceType,
                nominalAmount: quantity,
                limitPrice: limitPrice
            };
            const res: response = <response>await  http.post(`${BASE_URL}/inquiry/INQ_20251201075147/order`, payload)
            console.log("buyProduct res", res);
            if (res.code !== 200) {
                resolve(res.data as orderPayloadResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch buyProduct info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * 用户行权（All）
 * */
export const exerciseHandler = (orderId: string, payload: ExerciseReq):Promise<ExerciseResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.post(`${BASE_URL}/users/orders/${orderId}/exercise`, payload)
            console.log("exerciseHandler res", res);
            if (res.code !== 200) {
                resolve(res.data as ExerciseResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch exerciseHandler info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}

/**
 * 用户订阅消息
 * */
export const subscribeMessage = (templateIds: string):Promise<subscribeMessageResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                template_id: templateIds
            }
            const res: response = <response>await http.post(`${BASE_URL}/user-wechat-subscriptions/user/subscribe`, payload)
            console.log("subscribeMessage res", res);
            if (res.code !== 200) {
                resolve(res.data as subscribeMessageResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch subscribeMessage info'));
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

/**
 * 上传支付凭证
 * */
export const uploadPaymentProof = (orderId: string, imgFile: File, bankName: string, bankAccount: string):Promise<UploadImageResp> => {
    const payload:UploadImageReq = {
        voucherImage: imgFile,
        bankName,
        bankAccount
    }

    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await  http.post(`${BASE_URL}/users/orders/${orderId}/payment-proof`, payload, 'application/x-www-form-urlencoded')
            console.log("calculator res", res);
            if (res.code !== 200) {
                resolve(res.data as UploadImageResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch calculator info'));
            }
        } catch (error) {
            reject(error);
        }

    })
}


/**
 * 获取用户订单信息
 * */
export const getUserOrderInfo = (page: number, size: number, status: string):Promise<userOrderResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/users/orders?page=${page}&size=${size}&status=${status}`)
            console.log("getUserOrderInfo res", res);
            if (res.code !== 200) {
                resolve(res.data as userOrderResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getUserOrderInfo info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取订单详情
 * */
export const orderDetail = (orderId: string):Promise<OrderDetail> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/users/orders/${orderId}`)
            console.log("orderDetail res", res);
            if (res.code !== 200) {
                resolve(res.data as OrderDetail)
            } else {
                reject(new Error(res.message || 'Failed to fetch order detail info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取银行收款信息
 * */
export const bankReceiptInfo = (orderId: string):Promise<BankAccountInfoResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/users/orders/${orderId}/bank-info`)
            console.log("bankReceiptInfo res", res);
            if (res.code !== 200) {
                resolve(res.data as BankAccountInfoResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch bank receipt info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取支付凭证信息
 */
export const paymentProofInfo = (orderId: string):Promise<PaymentProofInfoResp> => {

    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/users/orders/${orderId}/payment-proof`)
            console.log("paymentProofInfo res", res);
            if (res.code !== 200) {
                resolve(res.data as PaymentProofInfoResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch payment Proof Info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取图片
 * */
export const getImage = (paymentVoucherUrl: string):Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: any = <response>await http.get(`${BASE_URL}${paymentVoucherUrl}?timestamp=${new Date().getTime()}`)
            console.log("getImage res", res);
            if (res.code !== 200) {
                resolve(res as any)
            } else {
                reject(new Error(res.message || 'Failed to fetch image'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

// TODO 废弃
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
