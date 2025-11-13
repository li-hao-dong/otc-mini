export interface InquiryHistoryReq {
    /**
     * 按期权类型过滤
     */
    optionType?: OptionType;
    page?: number;
    pageSize?: number;
    /**
     * 按标的代码或名称过滤
     */
    underlying?: string;
    [property: string]: any;
}

/**
 * 按期权类型过滤
 */
enum OptionType {
    Snowball = "SNOWBALL",
    Vanilla = "VANILLA",
}


export interface InquiryHistoryResp {
    inquiries?: InquiryHistoryDetail[];
    pagination?: Pagination;
    [property: string]: any;
}

/**
 * InquiryHistoryDetail
 */
interface InquiryHistoryDetail {
    /**
     * 询价时的股价
     */
    currentPrice?: number;
    /**
     * 询价记录唯一ID
     */
    inquiryId?: string;
    inquiryParameters?: InquiryParameters;
    /**
     * 历史询价的结果数据
     */
    inquiryResults?: QuoteResult[];
    /**
     * 询价时间
     */
    inquiryTime?: Date;
    /**
     * 询价规模（万元）
     */
    nominalAmount?: number;
    /**
     * 期权类型
     */
    optionType?: OptionType;
    /**
     * 询价时的涨跌幅
     */
    priceChange?: string;
    /**
     * 报价结果数量
     */
    resultCount?: number;
    /**
     * 标的名称
     */
    underlying?: string;
    /**
     * 标的代码
     */
    underlyingCode?: string;
    [property: string]: any;
}

interface InquiryParameters {
    nominalAmount?: number;
    optionType?: string;
    sources?: string[];
    structures?: string[];
    terms?: string[];
    underlying?: string;
    [property: string]: any;
}

/**
 * QuoteResult
 */
interface QuoteResult {
    quotes?: Quote[];
    /**
     * 结构代码
     */
    structure?: string;
    /**
     * 结构显示名称
     */
    structureName?: string;
    /**
     * 期限代码
     */
    term?: string;
    /**
     * 期限显示名称
     */
    termName?: string;
    [property: string]: any;
}

interface Quote {
    /**
     * 是否有报价
     */
    isAvailable?: boolean;
    /**
     * 是否推荐报价
     */
    isRecommended?: boolean;
    /**
     * 报价（百分比）
     */
    price?: number;
    /**
     * 产品代码（用于下单）
     */
    productCode?: string;
    /**
     * 报价方代码
     */
    sourceCode?: string;
    /**
     * 报价方名称
     */
    sourceName?: string;
    [property: string]: any;
}


interface Pagination {
    page?: number;
    pageSize?: number;
    total?: number;
    totalPages?: number;
    [property: string]: any;
}
