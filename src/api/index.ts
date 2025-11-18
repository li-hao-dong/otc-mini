
/* POST 请求 */
import type {InquiryQuoteReq, InquiryResp} from "@/interfaces/inquiry/inquiryQuote";
import type {response} from "@/interfaces/response";
import type {InquiryOptionsResp} from "@/interfaces/inquiry/inquiryOptions";
import type {InquiryHistoryResp} from "@/interfaces/inquiry/inquiryHistory";
import http from "@/utils/request/request";

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
const inquiryOptions = (inquiryQuoteReq:InquiryQuoteReq) => {
    http.get("/inquiry/options")?.then(response => {
        console.log("inquiryQuoteReq", inquiryQuoteReq);
        const res: response = {
            code: 200,
            message: "success",
            requestId: "1234567890",
            timestamp: new Date(),
            data: {
                nominalAmounts: [100.0],
                optionTypes: [
                    {
                        code: "SNOWBALL",
                        name: "雪球",
                    },
                    {
                        code: "VANILLA",
                        name: "普通",
                    }
                ],
                popularUnderlyings: [
                    {
                        assetCode: "1234567890",
                        assetName: "1234567890",
                        currentPrice: 10.0,
                        priceChange: "10.0",
                    }
                ],
                sources: [
                    {
                        code: "1234567890",
                        isActive: true,
                    }
                ],
                structures: [
                    {
                        code: "1234567890",
                        exoticStructure: "1234567890",
                        name: "1234567890",
                        relativeStrike: 10.0,
                        strikeType: 'ATM',
                    }
                ],
                terms: [
                    {
                        code: "1234567890",
                        days: 10,
                        name: "1234567890",
                    }
                ]
            } as InquiryOptionsResp
        }
        return res
    })
}
/**
 * 获取询价历史
 * */
const inquiryHistory = () => {
    http.get("/inquiry/history")?.then(response => {
        const res: response = {
            code: 200,
            message: "success",
            requestId: "1234567890",
            timestamp: new Date(),
            data: {
                inquiries: [
                    {
                        currentPrice: 10.0,
                        inquiryId: "1234567890",
                        inquiryParameters: {
                            nominalAmount: 100.0,
                            optionType: "SNOWBALL",
                            sources: ["1234567890"],
                            structures: ["1234567890"],
                            terms: ["1234567890"],
                            underlying: "1234567890",
                        },
                        inquiryResults: [
                            {
                                quotes: [
                                    {
                                        isAvailable: true,
                                        isRecommended: true,
                                    }
                                ],
                                structure: "1234567890",
                                structureName: "1234567890",
                                term: "1234567890",
                                termName: "1234567890",
                            }
                        ],
                        inquiryTime: new Date(),
                        nominalAmount: 100.0,
                        optionType: "SNOWBALL",
                        priceChange: "10.0",
                        resultCount: 10,
                        underlying: "1234567890",
                        underlyingCode: "1234567890",
                    }
                ],
                pagination: {
                    page: 1,
                    pageSize: 10,
                    total: 100,
                    totalPages: 10,
                }
            } as InquiryHistoryResp
        }

        return res
    })
}
