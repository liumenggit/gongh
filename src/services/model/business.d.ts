import {Coupon} from '@/services/model/coupon';

/**
 * 商家信息
 */
declare interface Business {
    coupon_list: [Coupon];
    info: BusinessInfo;
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
    coupon_card: [Coupon];
    db: number;
    integral: [any];
    business: string;
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
