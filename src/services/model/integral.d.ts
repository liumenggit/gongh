import {getIntegralRecord} from '@/services/api/integral';

declare interface IntegralCate {
    id: number,
    name: string,
    status: number
    key?: number,
    title?: string
}


declare interface IntegralShop {
    /**
     * 商品分类ID
     */
    category: number;
    /**
     * 创建时间
     */
    created_at: string;
    deleted_at: null;
    /**
     * 商品详情（富文本）
     */
    details: string;
    /**
     * 商品ID
     */
    id: number;
    /**
     * 商品图
     */
    image: string;
    /**
     * 投放结束时间
     */
    invest_end_time: string;
    /**
     * 投放开始时间
     */
    invest_start_time: string;
    /**
     * 市场价
     */
    market_price: string;
    /**
     * 商品名称
     */
    name: string;
    /**
     * 积分
     */
    points: number;
    /**
     * 推荐状态（是/否）
     */
    recommend: string;
    /**
     * 兑换限制（***件/人）
     */
    redemption_limit: number;
    /**
     * 兑换类型（1积 / 2积分加现金）
     */
    redemption_type: string;
    /**
     * 1无跳转 2跳转商家 3跳转文章
     */
    redirect: string;
    /**
     * 跳转链接
     */
    redirect_link: string;
    /**
     * 商家Id
     */
    seller: number;
    /**
     * 是否显示库存
     */
    show_stock: number;
    /**
     * 商品状态（上架/下架）
     */
    status: string;
    /**
     * 库存
     */
    stock: number;
    /**
     * 副标题
     */
    subtitle: string;
    /**
     * 编辑时间
     */
    updated_at: null | string;
    /**
     * 使用须知（富文本）
     */
    usage_notes: string;
    /**
     * 使用结束时间
     */
    use_end_time: string;
    /**
     * 使用开始时间
     */
    use_start_time: string;
}



declare interface IntegralRecord{
    /**
     * 操作内容
     */
    content: string;
    /**
     * 积分商品分类id
     */
    goca_id: number;
    /**
     * 积分商品id
     */
    goods_id: number;
    id: number;
    /**
     * 积分数
     */
    integral: number;
    /**
     * 积分余额
     */
    integral_balance: number;
    /**
     * 积分变更类型 1增加 2减少
     */
    integral_type: number;
    /**
     * 已结算年度
     */
    settlement_year: number;
    /**
     * 时间
     */
    time: string;
    /**
     * 类型 1签到2核销3后台|4 积分抽奖
     */
    type: number;
    /**
     * 用户姓名
     */
    user: string;
    /**
     * 用户ID
     */
    user_id: number;
}




declare interface IntegralLotterySetting{
    /**
     * 规则设置
     */
    archive: string;
    /**
     * 转盘背景图
     */
    background_image: string;
    /**
     * 每日抽奖次数
     */
    daily_frequency: number;
    /**
     * 结束时间
     */
    end_time: string;
    /**
     * 奖品列表
     */
    goods: [IntegralLotteryGood];
    /**
     * 活动ID
     */
    id: number;
    /**
     * 活动名称
     */
    name: string;
    /**
     * 指针图
     */
    pointer_image: string;
    /**
     * 奖品设置
     */
    prize: null;
    /**
     * 开始时间
     */
    start_time: string;
    /**
     * 状态(1开启 0禁用)
     */
    status: string;
    /**
     * 总抽奖次数
     */
    total_degree: number;
    /**
     * 转盘图
     */
    turntable_image: string;
    /**
     * 消耗积分
     */
    use_integral: number;
}

export interface IntegralLotteryGood {
    /**
     * 活动ID
     */
    activity_id?: number;
    /**
     * 商家ID
     */
    business_id?: number;
    created_at?: string;
    /**
     * 使用须知
     */
    detail?: null;
    /**
     * 使用结束时间
     */
    end_time?: string;
    /**
     * 奖品Id
     */
    id?: number;
    /**
     * 奖品图片
     */
    image?: null;
    /**
     * 奖励积分
     */
    integral?: number;
    /**
     * 奖品名称
     */
    name?: string;
    /**
     * 奖品数量
     */
    number?: number;
    /**
     * 支付现金
     */
    pay?: number;
    /**
     * 到店支付(1 是 0 否)
     */
    pay_type?: number;
    /**
     * 中奖概率 百分比
     */
    probability?: string;
    /**
     * 市场参考价
     */
    reference_price?: null;
    /**
     * 排序
     */
    sort?: number;
    /**
     * 使用开始时间
     */
    start_time?: string;
    /**
     * 奖品副标题
     */
    subtitle?: string;
    /**
     * 类型（1积分 2奖品）
     */
    type?: number;
    updated_at?: string;
}
