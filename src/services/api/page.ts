import {request} from '@/utils/http';

/**
 * 分页查询
 * @returns {Method<unknown, unknown, MessageListModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getPageList(pageParams: PageParams) {
    return request.Get<[PageInfo]>('page', {
        params: pageParams
    });
}


export function getCarouselList() {
    return request.Get<[any]>('carousel');
}
