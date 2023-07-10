declare interface Business {
    coupon_list: [Coupon];
    info: BusinessInfo;
}

export interface Coupon {
    days: number | null;
    eff_range: string;
    eff_time_end: number | null;
    eff_time_start: number | null;
    id: number;
    is_discount: number;
    is_new: number;
    price: string;
    rec_type: number;
    remark: string;
    title: string;
    type: number;
}

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

export interface BusinessInfo {
    address: string;
    content: string;
    imgs: string[];
    phone: number;
    title: string;
    translate: number;
    longitude: number;
    latitude: number;
}

export interface BusinessParams {
    /**
     * 商家id
     */
    id: number;
    latitude: number;
    longitude: number;
}

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


declare interface BusinessTypeRes {
    type_list: [BusinessType];
}

export interface BusinessType {
    id: number;
    img: string;
    name: string;
}
