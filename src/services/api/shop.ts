import {request} from '@/utils/http';

export function getShopGoodsList(payParams: PayParams) {
    return request.Get<any>('business_goods_list', {params: payParams});
}
