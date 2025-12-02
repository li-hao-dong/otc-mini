export interface orderPayloadReq {
    /**
     * 询价ID
     */
    inquiryId: string;
    /**
     * 限价单时的价格
     */
    limitPrice?: number;
    /**
     * 实际下单名义本金（元）
     */
    nominalAmount: number;
    /**
     * MARKET、LIMIT
     */
    priceType: PriceType;
    selectedQuote: SelectedQuote;
    [property: string]: any;
}

export enum PriceType {
    MARKET = "MARKET",
    LIMIT = "LIMIT"
}

export interface SelectedQuote {
    productCode?: string;
    [property: string]: any;
}