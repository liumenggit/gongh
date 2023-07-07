import {request} from '@/utils/http';
import {HomeSeting} from '@/services/model/home';

export function getHome() {
    return request.Get<HomeSeting>('index');
}
