export interface InquiryQuoteReq {
    /**
     * 名义本金（万元）
     */
    nominalAmount: number;
    /**
     * 期权类型
     */
    optionType: OptionType;
    /**
     * 报价方代码列表，空数组表示全选
     */
    sources?: string[];
    /**
     * 行权价结构
     */
    structures: string[];
    /**
     * 期限
     */
    terms: string[];
    /**
     * 标的名称或代码（精确匹配）
     */
    underlying: string;
    [property: string]: any;
}

/**
 * 期权类型
 */
enum OptionType {
    Snowball = "SNOWBALL",
    Vanilla = "VANILLA",
}


/**
 * InquiryResp
 */
export interface InquiryResp {
    /**
     * 当前股价
     */
    currentPrice?: number;
    /**
     * 询价ID，用于后续下单
     */
    inquiryId?: string;
    /**
     * 询价时间
     */
    inquiryTime?: Date;
    /**
     * 询价规模（万元）
     */
    nominalAmount?: number;
    /**
     * 涨跌幅
     */
    priceChange?: string;
    results?: QuoteResult[];
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

/**
 * QuoteResult
 */
export interface QuoteResult {
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
