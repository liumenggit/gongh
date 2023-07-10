export enum NAVIGATE_TYPE {
    NAVIGATE_TO = 'navigateTo',
    REDIRECT_TO = 'redirectTo',
    RE_LAUNCH = 'reLaunch',
    SWITCH_TAB = 'switchTab',
    NAVIGATE_BACK = 'navigateBack',
}

export const NAVIGATE_TYPE_LIST = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

/**
 * 系统首页
 * @type {string}
 */
export const HOME_PAGE = '/pages/index/index';
/**
 * 系统登录页
 * @type {string}
 */
export const LOGIN_PAGE = '/pages/my/login';
export const AUTH_PAGE = '/pages/login/auth';
/**
 * 公共404
 * @type {string}
 */
export const NOT_FOUND_PAGE = '/pages/notFound/404';
