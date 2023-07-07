import {UserCardVerifyParams, UserInfoState, UserPerfectParams} from '@/services/model/userModel';
import {request} from '@/utils/http';

/**
 * 完善用户信息
 * @param {UserPerfectParams} params
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function userPerfect(params: UserPerfectParams) {
    console.log('请求参数', params);
    return request.Post<UserInfoState>('user_perfect', params);
}


/**
 * 获取用户信息
 * @returns {Method<unknown, unknown, UserInfo, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getUserInfo() {
    return request.Get<UserInfoState>('user_info');
}

/**
 * 设置用户头像
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param avatarUrl
 */
export function setUserAvatar(avatarUrl: string) {
    return request.Post<any>('set-nickname', {avatarUrl});
}


/**
 * 设置用户昵称
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param nickName
 */
export function setUserNickName(nickName: string) {
    return request.Post<any>('set_nickname', {nickName});
}


/**
 * 设置用户手机号
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param data
 */
export function setUserPhone(data: { phone: number, code: number }) {
    return request.Post<any>('user_perfect', data);
}

/**
 * 身份验证
 * @param {UserCardVerifyParams} userCardVerify
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function verifyUserCard(userCardVerify: UserCardVerifyParams) {
    return request.Post<UserCardVerifyParams>('user_card_verify', userCardVerify);
}
