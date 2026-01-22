export interface SmsCodeRes{
    success?: boolean;
    message?: string;
    request_id?: string;
    next_request_interval?: number;
}
