declare interface WxLoginParams {
    code: string;
}

declare interface PhoneLoginParams {
    phone: number;
    code: number;
}

declare interface LoginModel {
    token: string;
}
