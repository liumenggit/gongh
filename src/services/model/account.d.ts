/*
账户参数
 */
declare interface AccountParams {
    /**
     * 地址
     */
    bind_address: string;
    /**
     * 燃气号，选填，没有则留空
     */
    bind_gas?: string;
    /**
     * 身份证
     */
    bind_idcard: string;
    /**
     * 姓名
     */
    bind_name: string;
    /**
     * 手机号
     */
    bind_phone: string;
    /**
     * 小区ID
     */
    bind_village: number;
    /**
     * id，选填，不传新增，传了编辑
     */
    id?: number;
    /**
     * code，验证码
     */
    code: number;
}

/**
 * 账户模型
 */
declare interface AccountModel {
    /**
     * 地址
     */
    bind_address?: string;
    bind_createtime?: string;
    bind_gas?: string;
    bind_idcard?: string;
    bind_name?: string;
    bind_phone?: string;
    bind_village?: number;
    bind_village_name?: string;
    del?: number;
    id?: number;
    sass_id?: number;
    user_id?: number;
    user_name?: string;
    user_phone?: string;
}

