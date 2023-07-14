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

