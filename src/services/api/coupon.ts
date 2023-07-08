import {request} from '@/utils/http';

/**
 * 优惠券列表
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param couponListParams
 */
export function getCouponList(couponListParams: CouponListParams) {
    return request.Get<any>('/coupon', {params: couponListParams});
}
