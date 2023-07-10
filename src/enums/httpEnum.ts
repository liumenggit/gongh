/**
 * @description: 预设请求结果设置枚举
 */
export enum ResultEnum {
    /**
     * 通用成功
     * @type {ResultEnum.SUCCESS}
     */
    SUCCESS = 1,
    /**
     * 通用错误
     * @type {ResultEnum.ERROR}
     */
    ERROR = 0,
    /**
     * 未找到
     * @type {ResultEnum.NOTFOUND}
     */
    NOTFOUND = 400,
    /**
     * 未授权
     * @type {ResultEnum.UNAUTHORIZED}
     */
    UNAUTHORIZED = 401,
    /**
     * 服务错误
     * @type {ResultEnum.SERVERERROR}
     */
    SERVERERROR = 500,
    /**
     * 自定义成功
     * @type {ResultEnum.CUSTOM_SUCCESS}
     */
    CUSTOM_SUCCESS = 10000,
    /**
     * 更新TOKEN
     * @type {ResultEnum.UPDATE_TOKEN}
     */
    UPDATE_TOKEN = 10,
    /**
     * 上传失败
     * @type {ResultEnum.UPLOAD_ERROR}
     */
    UPLOAD_ERROR = 400200,

}

/**
 * 内容类型枚举
 */
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
