/**
 * 用户公共公共状态
 */
export declare interface UserInfoState {
    avatar: string;
    create_time: number;
    id: number;
    last_logintime: number;
    nickname: string;
    open_id: string;
    phone: number;
    realname: string;
    redirect_url: string;
    sass_id: number;
    status: number;
    type: number;
    auth: {
        card: {
            cardId: string
            name: string
        }
    };
}

/**
 * 完善用户参数
 */
declare interface UserPerfectParams {
    code: number;
    /**
     * 微信用户open_id
     */
    open_id: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 姓名
     */
    realname: string;
}


/**
 * Token
 */
declare interface Token {
    token?: string;
    access?: string;
}

declare interface UserCardVerifyParams {
    name: string,
    cardId: string,
}


declare interface UserRefine {
    name: string;
}
