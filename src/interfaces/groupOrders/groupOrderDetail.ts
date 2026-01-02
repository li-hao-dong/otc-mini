export interface GroupOrderDetailResp {
    currentSize: number;
    expireTime: string;
    groupOrderNo: string;
    groupRole: null;
    groupStatus: string;
    joinDeadline: string;
    maxAmountPerUser: number;
    members: Member[];
    minAmountPerUser: number;
    optionType: string;
    productCode: string;
    productName: string;
    quotedPrice: number;
    shareLink: string;
    shareQRCode: string;
    sourceName: string;
    strikeType: string;
    targetSize: number;
    termName: string;
    totalNominalAmount: number;
    underlyingAssetCode: string;
    underlyingAssetName: string;
    [property: string]: any;
}

export interface Member {
    joinTime?: string;
    nominalAmount?: number;
    orderStatus?: string;
    paymentStatus?: string;
    role?: string;
    userId?: string;
    [property: string]: any;
}
