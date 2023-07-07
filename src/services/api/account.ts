import {request} from '@/utils/http';

/**
 * 获取账户列表
 * @returns {Method<unknown, unknown, [AccountModel], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getAccountList() {
    return request.Get<[AccountModel]>('account_list');
}


/**
 * 添加编辑账户
 * @returns {Method<unknown, unknown, [AccountModel], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function putAccount(accountParams: AccountParams) {
    return request.Post<AccountModel>('account_edit', accountParams);
}


/**
 * 获取账户信息
 * @returns {Method<unknown, unknown, [AccountModel], unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getAccountInfo(account_id: number) {
    return request.Get<AccountModel>('account_info', {params: {account_id}});
}


/**
 * 删除账户
 * @param {number} accountId
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function deleteAccount(accountId: number) {
    return request.Delete<any>('account_del', {account_id: accountId});
}


