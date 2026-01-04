export interface UserGroupOrderDetailResp {
    bankAccount: null;
    bankName: null;
    channelSubmitTime: null;
    createdTime: string;
    customerName: string;
    customerPhone: string;
    daysToExpiry: number;
    estimatedPayout: string;
    estimatedProfit: string;
    exerciseTime: null;
    isInTheMoney: null;
    maturityDate: string;
    nominalAmount: string;
    optionCode: string;
    optionFee: string;
    optionFeeRate: string;
    optionType: string;
    orderNo: string;
    orderStatus: string;
    paymentAmount: null;
    paymentTime: null;
    paymentVoucherUrl: null;
    priceChange: string;
    profitRate: string;
    purchaseTime: null;
    quotedPrice: string;
    relativeStrike: string;
    settlementAmount: null;
    settlementPrice: null;
    sourceName: string;
    sourceShortName: string;
    startDate: string;
    statusTimeline: StatusTimeline[];
    strikePrice: string;
    strikeType: string;
    structureDisplayName: string;
    termName: string;
    transactionFee: string;
    underlyingAssetCode: string;
    underlyingAssetName: string;
    underlyingPrice: string;
    upstreamFee: null;
    upstreamQuote: null;
    upstreamQuoteTime: null;
    volatilityPercent: string;
    [property: string]: any;
}

export interface StatusTimeline {
    description?: string;
    operator?: string;
    status?: string;
    timestamp?: string;
    [property: string]: any;
}
