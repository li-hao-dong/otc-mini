export interface UploadImageReq {
    /**
     * 汇款银行账号
     */
    bankAccount: string;
    /**
     * 汇款银行名称
     */
    bankName: string;
    /**
     * 实际支付金额
     */
    paymentAmount?: number;
    /**
     * 支付时间
     */
    paymentTime?: Date;
    /**
     * 支付凭证图片文件
     */
    voucherImage: string;
    /**
     * 汇款人姓名
     * */
    bankUserName: string;
    [property: string]: any;
}

export interface UploadImageResp {
    orderNo?: string;
    orderStatus?: string;
    paymentVoucherUrl?: string;
    [property: string]: any;
}
