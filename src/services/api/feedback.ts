import {request} from '@/utils/http';

/**
 * 意见建议新增
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param feedbackParams
 */
export function createFeedback(feedbackParams: FeedbackParams) {
    return request.Post<any>('feedback_add', feedbackParams);
}
