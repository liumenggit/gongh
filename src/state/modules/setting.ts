import {defineStore} from 'pinia';
import {getCache, setCache} from '@/utils/cache';
import {getHome} from '@/services/api/home';
import {CouponType} from '@/services/model/home';
import {AREA, AREA_NAME, COUPON_TYPE_LIST} from '@/enums/cacheEnum';

interface Setting {
    area: Area;
    area_nmae: string;
    access?: string;
    bgimg: string;
    couponTypeList: [CouponType];
}

interface Area {
    id: number,
    name: string,
    type: string
}

export const useSettingStore = defineStore('setting', {
    state: (): Setting => ({
        area: getCache(AREA) || {name: '海拉尔', type: 'area', id: 1},
        area_nmae: getCache(AREA_NAME) || '选择地区',
        bgimg: 'https://wx.shuidiwang.cn/addons/china_ghphpt/resource/mobileImg/loginBg.jpg',
        couponTypeList: getCache(COUPON_TYPE_LIST) || []
    }),
    getters: {
        getArea: (state) => {
            // return state.token ? {authorization: `Bearer ${state.token}`} : {};
            return state.area ? {'current_value': state.area.type + '-' + state.area.id} : {};
        },
    },
    actions: {
        setArea(area: Area) {
            this.$state.area = area;
            setCache(AREA, area);
        },
        initSetting() {
            getHome().send().then((res) => {
                console.log('getHome????', res);
                this.$state.couponTypeList = res.coupon_type_list;
                setCache(COUPON_TYPE_LIST, this.$state.couponTypeList);
            });
        }
    },
});
