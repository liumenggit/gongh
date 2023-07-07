import {request} from '@/utils/http';

/**
 * 获取网点列表
 * @returns {Method<unknown, unknown, MessageListModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getOutletsList() {
    return request.Get<[OutletsModel]>('network_list');
}
