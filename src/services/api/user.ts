import {BindUserParams, UserCardVerifyParams, UserInfoState, UserPerfectParams} from '@/services/model/user';
import {request} from '@/utils/http';


/**
 * 绑定用户信息
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param bindUserParams
 */
export function bindUser(bindUserParams: BindUserParams) {
    return request.Post<UserInfoState>('accountLogin', bindUserParams);
}


/**
 * 完善用户信息
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param userPerfectParams
 */
export function userPerfect(userPerfectParams: UserPerfectParams) {
    return request.Post<UserInfoState>('setUserInfo', userPerfectParams);
}


/**
 * 获取用户信息
 * @returns {Method<unknown, unknown, UserInfo, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function getUserInfo() {
    return request.Get<UserInfoState>('getUserInfo');
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
 * 获取用户授权手机号
 * @returns {Method<unknown, unknown, UserInfoState, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 * @param code
 */
export function authUserPhone(code: number) {
    return request.Post<any>('getWxPhone', {code});
}

/**
 * 身份验证
 * @param {UserCardVerifyParams} userCardVerify
 * @returns {Method<unknown, unknown, any, unknown, {requestType?: "upload" | "download"} & UniappRequestConfig & UniappUploadConfig & UniappDownloadConfig, UniNamespace.RequestSuccessCallbackResult | UniNamespace.UploadFileSuccessCallbackResult | UniNamespace.DownloadSuccessData, any>}
 */
export function verifyUserCard(userCardVerify: UserCardVerifyParams) {
    return request.Post<UserCardVerifyParams>('user_card_verify', userCardVerify);
}
