export interface SmsCodeRes{
    success?: boolean;
    message?: string;
    request_id?: string;
    next_request_interval?: number;
}

/**
 * 短信验证码请求参数
 */
export interface SmsCodeReq {
    /** 手机号（带国际区号，如+8613790401000） */
    phone: string;
    /** 验证码类型：register（注册）、change_phone（修改手机号） */
    captcha_type: 'register' | 'change_phone';
}
