/**
 * 用户公共公共状态
 */
export declare interface UserInfoState {
    /**
     * 创建时间
     */
    add_time: string;
    /**
     * 总签到天数
     */
    all_sign: number;
    area: number;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 是否绑定（1.绑定|2.未绑定）
     */
    binding: number;
    /**
     * 生日
     */
    birthday: string;
    company: number;
    company_card: null | string;
    /**
     * 连续签到天数
     */
    continue_sign: number;
    /**
     * 可使用张数
     */
    couponCount: number;
    db: number;
    /**
     * 已优惠金额
     */
    discountAmount: number;
    /**
     * ID
     */
    id: number;
    /**
     * 身份证号码
     */
    idcard: string;
    /**
     * 用户积分
     */
    integral: number;
    /**
     * 真是姓名
     */
    name: string;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * openid
     */
    openid: string;
    /**
     * 手机号码
     */
    phone: string;
    /**
     * 最近签到天数
     */
    sign_time: number;
    /**
     * 状态（1.启用|2.停用）
     */
    status: number;
    /**
     * 编辑时间
     */
    update_time: string;
    /**
     * 已核销张数
     */
    writeOffCouponCount: number;
    /**
     * 所属组织
     */
    zuzhi: number;
}

/**
 * 完善用户参数
 */
declare interface UserPerfectParams {
    /**
     * 生日
     */
    birthday: string;
    /**
     * 身份证号码
     */
    idcard: string;
    /**
     * 真实姓名
     */
    name: string;
    /**
     * 联系的电话
     */
    phone: number;
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


/**
 * 绑定用户表单
 */
declare interface BindUserParams {
    /**
     * 验证码
     */
    code: string;
    /**
     * 姓名
     */
    name: string;
    /**
     * openid
     */
    openid: string;
    /**
     * 手机号
     */
    phone: number;
}
