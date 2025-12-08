
/**
 * PaymentProofInfo
 */
export interface PaymentProofInfoResp {
    /**
     * 银行账号
     */
    bankAccount?: string;
    /**
     * 银行名称
     */
    bankName?: string;
    /**
     * 支付金额
     */
    paymentAmount?: number;
    /**
     * 支付时间
     */
    paymentTime?: Date;
    /**
     * 上传时间
     */
    uploadTime?: Date;
    /**
     * 支付凭证URL
     */
    voucherUrl?: string;
    [property: string]: any;
}
