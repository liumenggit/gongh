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
}

export interface AdvList {
    id?: number;
    img?: string;
    title?: string;
    url?: string;
}

export interface AreaList {
    id: number;
    name: string;
    type:string
}

export interface CarouselList {
    id?: number;
    img?: string;
    title?: string;
    url?: string;
}

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

export interface NoticeList {
    id?: number;
    sub_title?: string;
    title?: string;
}
