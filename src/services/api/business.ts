import {request} from '@/utils/http';
import {
    Business, BusinessAddUserParams,
    BusinessInfo,
    BusinessListParams,
    BusinessParams, BusinessPayInfo,
    BusinessType,
    BusinessTypeRes, BusinessUserInfo, BusinessWithdrawalInfo
} from '@/services/model/business';


/**
 * 获取商户信息
 * @returns {any}
 */
export function getBusinessInfo(businessParams: BusinessParams) {
    console.log('businessParams', businessParams);
    return request.Get<Business>('business_detail', {params: businessParams});
}


/**
 * 获取商户列表
 * @returns {any}
 */
export function getBusinessList(businessListParams: BusinessListParams) {
    return request.Get<[BusinessInfo]>('business_list', {params: businessListParams});
}


/**
 * 获取商户分类
 * @returns {any}
 */
export function getBusinessTyoe() {
    return request.Get<BusinessTypeRes>('industry_list');
}


/**
 * 支付页信息
 * @returns {any}
 */
export function getBusinessPayInfo(id: number) {
    return request.Get<BusinessPayInfo>('pay_info', {params: {id}});
}


/**
 * 门店添加人员
 * @returns {any}
 */
export function createBusinessUser(businessAddUserParams: BusinessAddUserParams) {
    return request.Post<any>('add_clerk', businessAddUserParams);
}


/**
 * 门店添加人员
 * @returns {any}
 */
export function getBusinessUserList(pageParams: PageParams) {
    return request.Get<[BusinessUserInfo]>('clerk_list', {params: pageParams});
}


/**
 * 门店添加人员
 * @returns {any}
 */
export function deleteBusinessUser(id: number) {
    return request.Post<any>('del_clerk', {id});
}


/**
 * 财务管理
 * @returns {any}
 */
export function getBusinessWithdrawalList(pageParams: PageParams) {
    return request.Get<[BusinessWithdrawalInfo]>('withdrawal_list', {params: pageParams});
}


/**
 * 商户申请提现
 * @returns {any}
 */
export function applyBusinessWithdrawal(money: number) {
    return request.Post<[BusinessWithdrawalInfo]>('add_withdrawal', {money});
}


/**
 * 获取商户订单列表
 * @returns {any}
 */
export function getBusinessOrderList(pageParams: PageParams) {
    return request.Get<[any]>('order_list', {params: pageParams});
}
