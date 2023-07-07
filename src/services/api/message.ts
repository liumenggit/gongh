import {request} from '@/utils/http';
import {MessageInfoModel, MessageListModel, MessageParams} from '@/services/model/message';

/**
 * 意见建议新增
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param messageParams
 */
export function createMessage(messageParams: MessageParams) {
    return request.Post<any>('message_add', messageParams);
}

/**
 * 获取留言列表
 * @returns {Method<unknown, unknown, MessageListModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getMessageList() {
    return request.Get<[MessageListModel]>('message_list');
}


export function getMessageInfo(id: number) {
    return request.Get<MessageInfoModel>('message_info', {params: {id}});
}
