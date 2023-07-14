import {Coupon} from '@/services/model/coupon';

export function toCoupon(coupon: Coupon) {
    return {
        ...coupon,
        priceDetail: {
            price: coupon.price || coupon.discount,
            subtext: coupon.price,
            prefix: coupon.price ? '￥' : '',
            suffix: coupon.discount ? '折' : ''
        },
        rightDetail: {
            title: coupon.type_title,
            subtitle: coupon.type_title,
            time: toRecType(coupon),
        }
    };
}

function toRecType(coupon: Coupon) {
    switch (coupon.rec_type) {
        case 1:
            return `领取后${coupon.days}天内`;
            break;
        case 2:
            return `有效期:${coupon.eff_time_end}-${coupon.eff_time_start}`;
            break;
    }

}


