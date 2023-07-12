import {request} from '@/utils/http';
import {Coupon, CouponListParams, CouponRes} from '@/services/model/coupon';

/**
 * 优惠券列表
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param couponListParams
 */
export function getCouponList(couponListParams: CouponListParams) {
    return request.Get<any>('/coupon', {params: couponListParams});
}

/**
 * 生日券列表
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param couponListParams
 */
export function getCouponBirthdayList(couponListParams: CouponListParams) {
    return request.Get<any>('/coupon_birthday', {params: couponListParams});
}


/**
 * 获取优惠券详情
 * @param {number} id
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getCouponInfo(id: number) {
    return request.Get<CouponRes>('/coupon_detail', {params: {'coupon_id': id}});
}


/**
 * 领取优惠券
 * @param {number} id
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function applyCoupon(id: number) {
    return request.Get<any>('/receive_coupon', {params: {'coupon_id': id}});
}


/**
 * 我的优惠券
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param pageParams
 */
export function getMyCoupon(pageParams: PageParams) {
    return request.Get<[Coupon]>('getCouponListByUserId', {params: pageParams});
}


/**
 * 微信优惠券
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param pageParams
 */
export function getCouponWxList(pageParams: PageParams) {
    return request.Get<{ data: [Coupon], total: number }>('coupon_wx', {params: pageParams});
}


// /**
//  * 优惠券类型
//  * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
//  * @param pageParams
//  */
// export function getCouponTypeList() {
//     return request.Get<any>('getCouponListByUserId', {params: pageParams});
// }

