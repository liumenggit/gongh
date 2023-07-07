import {request} from '@/utils/http';

/**
 * 获取商品类型
 * @returns {Method<unknown, unknown, MessageListModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getGoodsTypeList() {
    return request.Get<[GoodsType]>('goods_type');
}

/**
 * 开户商品list
 * @returns {Method<unknown, unknown, NoticeModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param type
 */
export function getGoodsOpenList(type: number) {
    return request.Get<[GoodsItem]>('goods_open', {params: {type}});
}

/**
 * 售后商品list
 * @param {number} type
 * @returns {Method<unknown, unknown, [GoodsItem], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getGoodsAfterList(type: number) {
    return request.Get<[GoodsItem]>('goods_after', {params: {type}});
}

/**
 * 商品详情
 * @returns {Method<unknown, unknown, [GoodsItem], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param id
 */
export function getGoodsInfo(id: number) {
    return request.Get<GoodsItem>('goods_open_info', {params: {id}});
}
