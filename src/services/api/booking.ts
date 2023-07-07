import {request} from '@/utils/http';

/**
 * 预约售后类型列表
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getBookingAfterTypeList() {
    return request.Get<[BookingAfterTypeList]>('get_reserve_after_category');
}

/**
 * 创建开户预约
 * @param {BookingOpenParams} createBookingOpenParams
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function createBookingOpen(createBookingOpenParams: BookingOpenParams) {
    return request.Post<any>('reserve_open', createBookingOpenParams);
}

/**
 * 预约类型列表
 * @returns {Method<unknown, unknown, [BookingTypeList], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getBookingTypeList() {
    return request.Get<[BookingTypeList]>('get_reserve_type');
}

/**
 * 获取用户预约列表
 * @param {string} type
 * @returns {Method<unknown, unknown, [UserBookingList], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getUserBookingList(type: string) {
    return request.Get<[UserBookingInfo]>('user_reserve', {params: {type}});
}


/**
 * 获取用户预约详情
 * @returns {Method<unknown, unknown, UserBooking, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param params
 */
export function getUserBookingInfo(params: BookingInfoParams) {
    return request.Get<UserBookingInfo>('user_reserve_info', {params: params});
}

/**
 * 预约须知
 * @returns {Method<unknown, unknown, UserBooking, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param type
 */
export function getBookingNotice(type: string) {
    return request.Get<[BookingNotice]>('reserve_notice', {params: {type: type}});
}

