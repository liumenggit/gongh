/**
 * 优惠券列表查询条件
 */
declare interface CouponListParams {
    page: number;
    limit: number;
    /**
     * 商家行业
     */
    business_hy?: number;
    /**
     * 商家类型
     */
    business_type?: number;
    /**
     * 优惠券类型
     */
    coupon_type?: number;
    /**
     * 地区
     */
    current_value?: string;
}


/**
 * 优惠券RES
 */
declare interface CouponRes {
    business: Business;
    coupon: Coupon;
}


/**
 * 优惠券商家信息
 */
export interface Business {
    add_time: number;
    address: string;
    admin_phone: string;
    admin_pwd: string;
    area: number;
    business_hy_id: number;
    business_type_id: number;
    company: null;
    content: string;
    id: number;
    imgs: string;
    is_show: number;
    is_up: number;
    logo: string;
    phone: string;
    sort: number;
    status: number;
    title: string;
    update_time: number;
    x: string;
    y: string;
}


/**
 * 优惠券
 */
export interface Coupon {
    /**
     * 创建时间
     */
    add_time?: number;
    /**
     * 城市
     */
    area?: number;
    /**
     * 商家ID
     */
    business_id?: number;
    /**
     * 优惠券编号
     */
    card_number?: string;
    /**
     * 卡券颜色值
     */
    code?: string;
    /**
     * 领取限制 （0.不限制）
     */
    collection?: null;
    /**
     * 卡券颜色ID
     */
    color?: number;
    /**
     * 企业
     */
    company?: null;
    count?: number;
    coupon_card_id?: number;
    days?: null;
    /**
     * 折扣
     */
    discount: number;
    /**
     * 有效结束时间
     */
    eff_time_end?: null;
    /**
     * 有效开始时间
     */
    eff_time_start?: null;
    /**
     * 卡券ID
     */
    id?: number;
    /**
     * 是否减免（1.减免 2.折扣）
     */
    is_discount?: number;
    /**
     * 新品 1是 0否
     */
    is_new?: number;
    /**
     * 推荐 1是 0否
     */
    is_rec?: number;
    /**
     * 重复（1.是 0. 否）
     */
    is_repeat?: number;
    is_show?: number;
    /**
     * 状态0未领取 1已领取 2已核销 3已过期
     */
    is_state?: number;
    /**
     * 卡券发放数量
     */
    number?: number;
    /**
     * 减免金额
     */
    price: number;
    /**
     * 投放结束时间
     */
    put_time_end?: number;
    /**
     * 投放开始时间
     */
    put_time_start?: number;
    /**
     * 领取 (1固定日期2有效时间区间)
     */
    rec_type?: number;
    /**
     * 须知
     */
    remark?: string;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 显示（1.是 0.否）
     */
    status?: number;
    /**
     * 名称
     */
    title: string;
    /**
     * 卡券类型ID
     */
    type?: number;
    /**
     * 卡券类型名称
     */
    type_title?: string;
    /**
     * 金额
     */
    market_price: number;
}

/**
 * 优惠券类型
 */
declare interface CouponType {
    /**
     * 优惠券颜色值
     */
    code: string;
    /**
     * 优惠券颜色
     */
    color: number;
    /**
     * 分类ID
     */
    id: number;
    /**
     * 标题
     */
    name: string;
}
