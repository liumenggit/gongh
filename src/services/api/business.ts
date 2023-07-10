import {request} from '@/utils/http';
import {
    Business,
    BusinessInfo,
    BusinessListParams,
    BusinessParams,
    BusinessType,
    BusinessTypeRes
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
