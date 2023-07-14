declare interface PayParams {
    /**
     * 商家id
     */
    business_id: number;
    /**
     * 优惠卡券id
     */
    card_id: number;
    /**
     * 余额
     */
    db: number;
    /**
     * 积分兑换id
     */
    integral_id: number;
    /**
     * 优惠金额
     */
    record_price: number;
    /**
     * 订单总金额
     */
    total: number;
}
