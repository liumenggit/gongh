import {request} from '@/utils/http';

/**
 * 支付
 * @param {PayParams} payParams
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function payBusiness(payParams: PayParams) {
    return request.Get<any>('pay', {params: payParams});
}
