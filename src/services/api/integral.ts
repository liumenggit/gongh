import {request} from '@/utils/http';

/**
 * 积分商品列表
 * @returns {any}
 */
export function getIntegralShopList(pageParams: PageParams) {
    return request.Get<[IntegralShop]>('getProductsList', {params: pageParams});
}


/**
 * 积分商品详情
 * @returns {any}
 */
export function getIntegralShopInfo(id: number) {
    return request.Get<IntegralShop>('getProductsInfo', {params: {id}});
}


/**
 * 兑换积分商品
 * @returns {any}
 */
export function applyIntegralShop(products_id: number, points: number) {
    return request.Post<IntegralShop>('productsIntegralExchange', {products_id, points});
}


/**
 * 已兑换积分商品
 * @returns {any}
 */
export function getMyIntegralShop(pageParams: PageParams) {
    return request.Get<[IntegralShop]>('getProductsInfo', {params: pageParams});
}
