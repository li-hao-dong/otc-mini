/**
 * BankAccountInfo
 */
export interface BankAccountInfoResp {
    /**
     * 收款账户名称
     */
    accountName?: string;
    /**
     * 应付金额
     */
    amount?: number;
    /**
     * 收款银行账号
     */
    bankAccount?: string;
    /**
     * 收款银行名称
     */
    bankName?: string;
    /**
     * 开户支行
     */
    branchName?: string;
    /**
     * 支付截止时间
     */
    deadline?: Date;
    /**
     * 转账备注
     */
    notes?: string;
    [property: string]: any;
}
