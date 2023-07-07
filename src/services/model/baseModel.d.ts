import {ResultEnum} from '@/enums/httpEnum';

/**
 * 请求超类
 */
declare interface API<T = any> {
    code: ResultEnum;
    data?: T;
    message: string;
    error: string;
}
