import {Coupon} from '@/services/model/coupon';

/**
 * 商家信息
 */
declare interface Business {
    coupon_list: [Coupon];
    info: BusinessInfo;
    goods_list: [ShopGoodsInfo];
}

/**
 * 商家信息
 */
export interface BusinessInfo {
    id: number;
    address: string;
    content: string;
    imgs: string[];
    phone: number;
    title: string;
    translate: number;
    latitude: number;
    longitude: number;
    account: string;
    add_time: number;
    admin_name: string;
    admin_phone: string;
    admin_pwd: string;
    area: number;
    bank: string;
    business_hy_id: number;
    business_type_id: number;
    company: null;
    db: number;
    is_show: number;
    is_up: number;
    logo: string;
    sort: number;
    status: number;
    update_time: number;
    x: string;
    y: string;
}

/**
 * 商家查询条件
 */
export interface BusinessParams {
    /**
     * 商家id
     */
    id: number;
    latitude: number;
    longitude: number;
}


/**
 * 商户列表查询条件
 */
export interface BusinessListParams {
    /**
     * 当前选中的值   最开始默认 area-1 意思是 地区海拉尔
     */
    current_value: string;
    /**
     * 关键字
     */
    keyword?: string;
    latitude?: string;
    /**
     * 每个多少个
     */
    limit: number;
    longitude?: string;
    /**
     * 第几页
     */
    page: number;
    /**
     * 行业分类id
     */
    type_id?: number;
}

/**
 * RES
 */
declare interface BusinessTypeRes {
    type_list: [BusinessType];
}


/**
 * 商户类型
 */
export interface BusinessType {
    add_time: number;
    area: number;
    company: null;
    id: number;
    img: string;
    is_show: number;
    is_up: number;
    name: string;
    sort: number;
    update_time: null;
}

/**
 * 商户行业
 */
export interface BusinessHy {
    add_time: number;
    area: number;
    company: null;
    id: number;
    img: string;
    is_show: number;
    is_up: number;
    name: string;
    sort: number;
    update_time: number | null;
}


declare interface BusinessPayInfo {
    coupon_card: [CouponList];
    db: number;
    integral: [any];
    business: BusinessInfo;
}


declare interface CouponList {
    add_time: number;
    card_number: string;
    coupon_id: number;
    coupon_type: number;
    get_time: number;
    id: number;
    is_state: number;
    member_id: number;
    use_time: string;
    coupon_info: Coupon;
}

declare interface BusinessAddUserParams {
    name: string;
    phone: number;
    idcard: string;
}


declare interface BusinessUserInfo {
    binding: number;
    id: number;
    idcard: string;
    name: string;
    phone: string;
}

declare interface BusinessWithdrawalInfo {
    create_time: string;
    number: string;
    price: number;
    state: number;
    state_2_time: string;
    state_3_time: string;
    state_name: string;
}
