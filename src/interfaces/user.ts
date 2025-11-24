/**
 * User
 */
export interface UserResp {
    address?: string;
    city?: string;
    country?: string;
    email?: string;
    email_verified?: boolean;
    first_name?: string;
    insert_timestamp?: Date;
    last_login?: Date;
    last_name?: string;
    phone?: string;
    phone_verified?: boolean;
    postal_code?: string;
    registration_date?: Date;
    status: string;
    update_timestamp?: Date;
    user_name: string;
    user_type: string;
    user_uuid: string;
    [property: string]: any;
}
