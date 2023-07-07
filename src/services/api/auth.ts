import {UserInfoState} from '@/services/model/userModel';
import {request} from '@/utils/http';

const LOGIN = '/user_wxlogin';
const LOGIN_OUT = '/logout';
const REFRESH_TOKEN = '/refresh/token';

/**
 * 登录
 * @param params
 */
export function userWxlogin(params: WxLoginParams) {
    return request.Post<UserInfoState>(LOGIN, params);
}

export function userPhonelogin(params: PhoneLoginParams) {
    return request.Post<any>(LOGIN, params);
}

/**
 * 登出
 */
export function logout() {
    return request.Post(LOGIN_OUT, {});
}

/**
 * 刷新token
 */
export function refreshToken() {
    return request.Post<LoginModel>(REFRESH_TOKEN, {});
}
