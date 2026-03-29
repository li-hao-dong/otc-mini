/**
 * User
 */
export interface UserResp {
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    email_verified?: number;
    first_name?: string;
    insert_timestamp?: Date;
    last_login?: Date;
    last_name?: string;
    phone?: string;
    phone_verified?: number;
    postal_code?: string;
    registration_date?: Date;
    status: string;
    update_timestamp?: Date;
    user_name: string;
    user_type: string;
    user_uuid: string;
    [property: string]: any;
}

/**
 * 修改密码请求参数
 */
export interface ChangePasswordReq {
    /** 旧密码 */
    old_password: string;
    /** 新密码 */
    new_password: string;
}

/**
 * 修改密码响应
 */
export interface ChangePasswordResp {
    status: string;
    message?: string;
}

/**
 * 修改手机号请求参数
 */
export interface ChangePhoneReq {
    /** 当前密码 */
    current_password: string;
    /** 新手机号（带国际区号，如+8613790401000） */
    new_phone: string;
    /** 短信验证码 */
    sms_code: string;
}

/**
 * 修改手机号响应
 */
export interface ChangePhoneResp {
    status: string;
    message?: string;
}
