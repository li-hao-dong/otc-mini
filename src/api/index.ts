
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
import type {loginH5Resp} from "@/interfaces/loginH5";
import type {CreateGroupOrderReq, CreateGroupOrderResp} from "@/interfaces/groupOrders/createGroupOrders";
import type {GetGroupOrdersReq, GetGroupOrdersResp} from "@/interfaces/groupOrders/getGroupOrders";
import type {GroupOrderDetailResp} from "@/interfaces/groupOrders/groupOrderDetail";
import type {AddGroupOrder} from "@/interfaces/groupOrders/addGroupOrder";
import type {MyGroupOrderReq, MyGroupOrderResp} from "@/interfaces/groupOrders/myGroupOrder";
import type {UserGroupOrderDetailResp} from "@/interfaces/groupOrders/getUserGroupOrderDetail";
import type {IndustryResp, industryStruct} from "@/interfaces/industry";
import type {ConceptResp, conceptStruct} from "@/interfaces/concept";
import type {RecommendationItemResp} from "@/interfaces/recommendation";
import type {IndicesResp} from "@/interfaces/indices";
import type {constituents} from "@/interfaces/constituents";

// MOCK API 基础地址
// const BASE_URL: string = "https://m1.apifoxmock.com/m1/7383056-7115424-default"
// const BASE_URL: string = "http://backtest.sunsmicro.com:22901/api/v1"

// #ifdef MP-WEIXIN
export const BASE_URL: string = "https://option.sunsmicro.com/api/v1"
// #endif

// #ifdef H5
export const BASE_URL: string = "/apiAgent"
export const BASE_URL_BOARD: string = "/boardApiAgent"
// export const BASE_URL: string = "https://option.sunsmicro.com/api/v1"
// #endif

/**
 * 发起询价
 * */
export const inquiryQuote = (inquiryQuoteReq: InquiryQuoteReq): Promise<InquiryResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.post(`${BASE_URL}/inquiry/quote`, inquiryQuoteReq)
            // console.log("InquiryResp res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            // console.log("login res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            // console.log("buyProduct res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            // console.log("exerciseHandler res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            // console.log("subscribeMessage res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
 * 用户注册 H5
 * */
export const userRegister = (userName: string, password: string, telephone: string, referrerUuid: string):Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                user_name: userName,
                password: password,
                telephone: telephone,
                referrer_uuid: referrerUuid
            }
            const res: response = <response>await  http.post(`${BASE_URL}/users/register`, params)
            // console.log("userRegister res", res);
            if (res.data.id) {
                resolve(res.data as any)
            } else {
                reject(new Error(res.message || 'Failed to fetch userRegister info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 用户登录 H5
 * */
export const userLoginH5 = (userName: string, password: string, wechatLoginJsCode: string, referrerUuid: string):Promise<loginH5Resp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const params = {
                user_name: userName,
                password: password,
                wechat_login_js_code: wechatLoginJsCode ? wechatLoginJsCode : null,
                referrer_uuid: referrerUuid
            }
            const res: response = <response>await http.post(`${BASE_URL}/users/login`, params)
            // console.log("userLogin res", res);
            if (res.statusCode == 200) {
                resolve(res.data as loginH5Resp)
            } else {
                reject(new Error(res.message || 'Failed to fetch userLogin info'));
            }
        } catch (error) {
            console.error("err", error)
            reject(error?.message);
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res as any)
            } else {
                reject(new Error(res.message || 'Failed to fetch image'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 创建拼单（发起拼单）
 * */
export const createGroupOrder = (payload: CreateGroupOrderReq):Promise<CreateGroupOrderResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.post(`${BASE_URL}/group-orders`, payload, 'application/json')
            console.log("createGroupOrder res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as CreateGroupOrderResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch createGroupOrder info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取市场中拼单列表（非当前用户）
 * */
export const getGroupOrders = (payload:GetGroupOrdersReq|undefined):Promise<GetGroupOrdersResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `${BASE_URL}/group-orders?`;
            if(payload) {
                Object.keys(payload).map((key, i) => {
                    if(i === Object.keys(payload).length-1) {
                        url += `${key}=${payload[key]}`
                    }else {
                        url += `${key}=${payload[key]}&`
                    }
                })
            }

            const res: response = <response>await http.get(url)
            console.log("getGroupOrders res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as GetGroupOrdersResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getGroupOrders info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取当前用户拼单列表
 * */
export const getMyGroupOrders = (payload:MyGroupOrderReq):Promise<MyGroupOrderResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `${BASE_URL}/group-orders/my-groups?`;
            if (payload) {
                Object.keys(payload).map((key, i) => {
                    if (i === Object.keys(payload).length - 1) {
                        url += `${key}=${payload[key]}`
                    } else {
                        url += `${key}=${payload[key]}&`
                    }
                })
            }

            const res: response = <response>await http.get(url)
            console.log("getMyGroupOrders res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as MyGroupOrderResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getMyGroupOrders info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取拼单详情
 * */
export const getGroupOrderDetail = (groupOrderNo:string):Promise<GroupOrderDetailResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/group-orders/${groupOrderNo}`)
            console.log("getGroupOrderDetail res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as GroupOrderDetailResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getGroupOrderDetail info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}
/**
 * 加入拼单
 * */
export const addGroupOrder = (groupOrderNo:string, nominalAmount: number):Promise<AddGroupOrder> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.post(`${BASE_URL}/group-orders/${groupOrderNo}/join`, {
                nominalAmount:nominalAmount,
                priceType: "Market"
            }, "application/json")
            console.log("addGroupOrder res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as AddGroupOrder)
            } else {
                reject(new Error(res.message || 'Failed to fetch addGroupOrder info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取用户拼单成功的订单信息
 * */
export const getUserGroupOrderSuccessOrders = (groupOrderNo:string):Promise<UserGroupOrderDetailResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/group-orders/${groupOrderNo}/order`)
            console.log("getUserGroupOrderSuccessOrders res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as UserGroupOrderDetailResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getUserGroupOrderSuccessOrders info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取市场指数汇总
 * */
export const getIndices = ():Promise<IndicesResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL}/market/indices`)
            console.log("getIndices res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as IndicesResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getIndices info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取行业板块指数排行榜
 * */
export const getIndustry = (limit: number):Promise<industryStruct> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL_BOARD}/industry?limit=${limit ? limit:5}`)
            console.log("getIndustry res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as industryStruct)
            } else {
                reject(new Error(res.message || 'Failed to fetch getIndustry info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取概念板块指数排行榜
 * */
export const getConcept = (limit: number):Promise<conceptStruct> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL_BOARD}/concept?limit=${limit ? limit:5}`)
            console.log("getConcept res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as conceptStruct)
            } else {
                reject(new Error(res.message || 'Failed to fetch getConcept info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}


/**
 * 获取推荐股票
 * */
export const getRecommendations = ():Promise<RecommendationItemResp> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL_BOARD}/recommendations?limit=${10}`)
            console.log("getConcept res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as RecommendationItemResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch getConcept info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取拼单手续费率
 * */
export const getStockFee = (symbol: string):Promise<number> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL_BOARD}/stock/fee?symbol=${symbol}`)
            console.log("getStockFee res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.value as number)
            } else {
                reject(new Error(res.message || 'Failed to fetch getStockFee info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}

/**
 * 获取板块成分股列表
 * */
export const getConstituents = (board_type: string, symbol:string):Promise<constituents[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res: response = <response>await http.get(`${BASE_URL_BOARD}/constituents?board_type=${board_type}&symbol=${symbol}`)
            console.log("getConstituents res", res);
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as constituents[])
            } else {
                reject(new Error(res.message || 'Failed to fetch getConstituents info'));
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
            if (res.code == 200 || res.statusCode == 200 || res.status == "success") {
                resolve(res.data as UserResp)
            } else {
                reject(new Error(res.message || 'Failed to fetch user info'));
            }
        } catch (error) {
            reject(error);
        }
    })
}
