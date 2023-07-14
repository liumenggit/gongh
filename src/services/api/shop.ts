import {request} from '@/utils/http';

export function getShopGoodsList(payParams: PayParams) {
    return request.Get<any>('business_goods_list', {params: payParams});
}


export function getShopGoodsInfo(id: number) {
    return request.Get<{ info: ShopGoodsInfo }>('business_goods_detail', {params: {id}});
}
