export interface GetGroupOrdersReq {
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
     * 按标的code筛选
     */
    underlyingAssetCode?: string;
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
    Open = "Open",
    Full = "Full",
    Paying = "Paying",
    Paid = "Paid",
    Timeout = "Timeout",
    Cancelled = "Cancelled",
}

/**
 * 获取拼单列表响应参数
 */
export interface GetGroupOrdersResp {
    groups: Group[];
    pagination: Pagination;
}

export interface Group{
    groupOrderNo: string,
    productCode: string,
    productName: string,
    underlyingAssetName: string,
    optionType: string,
    termName: string,
    targetSize: number,
    currentSize: number,
    totalNominalAmount: number,
    groupStatus: string,
    expireTime: string,
    remainingTime: number,
    creatorName: string,
}

export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}
