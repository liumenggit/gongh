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
    id: number;
    img: string;
    name: string;
}


declare interface BusinessPayInfo {
    coupon_card: [Coupon];
    db: number;
    integral: [any];
    business: string;
}

