import {request} from '@/utils/http';


export function getShopCat() {
    return request.Get<[ShopCat]>('/shop-cat');
}
