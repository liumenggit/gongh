import {request} from '@/utils/http';

/**
 * 获取通知列表
 * @returns {Method<unknown, unknown, MessageListModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getNoticeList() {
    return request.Get<[NoticeModel]>('notice_list');
}

/**
 * 获取通知详情
 * @param {number} noticeId
 * @returns {Method<unknown, unknown, NoticeModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getNoticeInfo(noticeId: number) {
    return request.Get<NoticeModel>('notice_info', {params: {id: noticeId}});
}
