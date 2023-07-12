import {CouponType} from '@/services/model/coupon';
import {BusinessHy, BusinessType} from '@/services/model/business';

/**
 * 首页信息
 */
declare interface HomeSeting {
    adv_list: AdvList[];
    all_click_num: number;
    block: AreaList[];
    carousel_list: CarouselList[];
    company_list: CompanyList[];
    foot_button: FootButton;
    /**
     * 用户人数
     */
    member_count: number;
    notice_list: NoticeList[];
    today_click_num: number;
    coupon_type_list: [CouponType];
    business_type: [BusinessHy];
    business_hy: [BusinessType];
}


/**
 * 广告列表
 */
export interface AdvList {
    id?: number;
    img?: string;
    title?: string;
    url?: string;
}

/**
 * 区域列表
 */
export interface AreaList {
    id: number;
    name: string;
    type: string;
}


/**
 * 轮播列表
 */
export interface CarouselList {
    id?: number;
    img?: string;
    title?: string;
    url?: string;
}

/**
 * 公司列表
 */
export interface CompanyList {
    id: number;
    name: string;
}

export interface FootButton {
    card_img_after: string;
    card_img_before: string;
    id: number;
    index_img_after: string;
    index_img_before: string;
    integral_img_after: string;
    integral_img_before: string;
    sell_img_after: string;
    sell_img_before: string;
    user_img_after: string;
    user_img_before: string;
}

/**
 * 通知列表
 */
export interface NoticeList {
    id?: number;
    sub_title?: string;
    title?: string;
}
