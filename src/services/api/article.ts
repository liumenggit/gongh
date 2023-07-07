import {request} from '@/utils/http';
import {dateFormat} from '@/utils/common/date-format';

/**
 * 文章分类
 */
export function getArticleTypeList() {
    return request.Get<[ArticleType]>('article_category');
}

/**
 * 文章列表
 * @returns {Method<unknown, unknown, NoticeModel, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param type
 */
export function getArticleList(type: number) {
    return request.Get<[ArticleItem]>('article_list', {params: {type}});
}

/**
 * 文章详情
 * @param {number} id
 * @returns {Method<unknown, unknown, ArticleItem, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getArticleInfo(id: number) {
    return request.Get<ArticleItem>('article_info', {
        params: {id},
        // @ts-ignore
        transformData<ArticleItem>(rawData: ArticleItem) {
            // @ts-ignore
            rawData.create_time = dateFormat(rawData.create_time);
            return rawData;
        }
    });
}
