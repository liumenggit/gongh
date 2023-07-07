import {request} from '@/utils/http';

/**
 * 获取订单详情
 * @param {number} orderId
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getOrderInfo(orderId: number) {
    return request.Get<OrderInfo>('order_info', {params: {orderId}});
}
