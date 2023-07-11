import {request} from '@/utils/http';

export function payBusiness(payParams: PayParams) {
    return request.Get<any>('pay', {params: payParams});
}
