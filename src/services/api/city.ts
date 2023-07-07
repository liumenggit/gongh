import {request} from "@/utils/http";

export function getCity(cityId?: number) {
    return request.Get<[any]>('city', {params: {cityId}});
}
