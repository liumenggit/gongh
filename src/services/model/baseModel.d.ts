import {ResultEnum} from '@/enums/httpEnum';

/**
 * 请求超类
 */
declare interface API<T = any> {
    state: ResultEnum;
    data?: T;
    msg: string;
    error: string;
}
