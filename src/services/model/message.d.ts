import {MessageEnum} from '@/enums/messageEnum';

/**
 * 留言提交参数
 */
declare interface MessageParams {
    content: string;
}

/**
 * 留言信息
 */
declare interface MessageListModel {
    content?: string;
    create_time?: string;
    id?: number;
    phone?: string;
    realname?: string;
    return_msg?: null;
    return_time?: null;
    return_user?: null;
    return_username?: null;
    sass_id?: number;
    status?: MessageEnum;
    user_id?: number;
}


declare interface MessageInfoModel {
    content: string;
    create_time: string;
    id: number;
    phone: string;
    realname: string;
    return_msg: null;
    return_time: null;
    return_user: null;
    return_username: null;
    sass_id: number;
    status: number;
    user_id: number;
}
