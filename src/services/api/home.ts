import {request} from '@/utils/http';
import {HomeSeting} from '@/services/model/home';

export function getHome(area?: string) {
    return request.Get<HomeSeting>('index', {params: {'current_value': area}});
}
