export interface MyGroupOrderReq {
    /**
     * 按期权类型筛选
     */
    optionType?: OptionType;
    page?: number;
    pageSize?: number;
    /**
     * 按产品代码筛选
     */
    productCode?: string;
    /**
     * 拼单状态筛选
     */
    status?: Status;
    /**
     * 按标的名称筛选
     */
    underlyingAssetName?: string;
    [property: string]: any;
}

/**
 * 按期权类型筛选
 */
export enum OptionType {
    Call = "Call",
    Put = "Put",
}

/**
 * 拼单状态筛选
 */
export enum Status {
    Full = "FULL",
    Open = "OPEN",
    Paying = "PAYING",
}


export interface MyGroupOrderResp {
    "groups": groups[];
    "pagination": {
        "page": number;
        "pageSize": number;
        "total": number;
        "totalPages": number;
    }
}

export interface groups{
    "groupOrderNo": string;
    "productCode": string;
    "productName": string;
    "underlyingAssetName": string;
    "optionType": string;
    "termName": string;
    "targetSize": number;
    "currentSize": number;
    "totalNominalAmount": number;
    "groupStatus": string;
    "expireTime": string;
    "remainingTime": number;
    "creatorName": string;
}
