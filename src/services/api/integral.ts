import {request} from '@/utils/http';
import {IntegralRecord} from '@/services/model/integral';

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


/**
 * 积分签到
 * @returns {any}
 */
export function applyIntegralSignIn() {
    return request.Get<any>('signIn');
}


/**
 * 积分明细
 * @returns {any}
 */
export function getIntegralRecord(pageParams: PageParams) {
    return request.Get<[IntegralRecord]>('getSignList', {params: pageParams});
}
