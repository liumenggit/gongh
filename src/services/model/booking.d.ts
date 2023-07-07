/**
 * 预约售后类型列表
 */
declare interface BookingAfterTypeList {
    create_time: string;
    id: number;
    sass_id: number;
    status: number;
    title: string;
}

/**
 * 预约类型列表
 */
declare interface BookingTypeList {
    title: string;
    id: string;
}

/**
 * 用户预约信息
 */
declare interface UserBookingInfo {
    account: number;
    address: string;
    check_time: null;
    check_user: null;
    check_username: null;
    create_time: string;
    gdk: string[];
    house: string[];
    id: number;
    idcard: string;
    idcard_f: string;
    idcard_z: string;
    nickname: string;
    offline_money: null;
    order_id: null;
    pay_time: null;
    phone: string;
    // 真实姓名
    realname: string;
    remark: null;
    reserve_id: string;
    sass_id: number;
    signature: string;
    status: number;
    status_name: string;
    user: number;
    village: number;
    village_name: string;
    worker: null;
}

/**
 * 预约详情
 */
declare interface BookingInfoParams {
    id: number;
    type: string;
}


/**
 * 开户预约表单
 */
declare interface BookingOpenParams {
    /**
     * 账户id
     */
    account_id: number;
    /**
     * 管道口照片，多张用 “；” 分号分割
     */
    gdk: string;
    /**
     * 房产证照片，多张用 “；” 分号分割
     */
    house: string;
    /**
     * 身份证反面照片
     */
    idcard_f: string;
    /**
     * 身份证正面照片
     */
    idcard_z: string;
    /**
     * 客户签名
     */
    signature: string;
}

/**
 * 预约须知
 */
declare interface BookingNotice {
    content?: string;
    create_time?: string;
    id?: number;
    sass_id?: number;
    time?: number;
    title?: string;
    type?: string;
}

