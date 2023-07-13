import {defineStore} from 'pinia';
import {getCache, setCache} from '@/utils/cache';
import {getHome} from '@/services/api/home';
import {
    AREA,
    AREA_NAME,
    BUSINESS_HY_TYPE_LIST,
    BUSINESS_TYPE_LIST,
    COUPON_TYPE_LIST,
    INTEGRAL_PRODUCTS_CATEGORIES, POINTS_CHECKIN_RULES
} from '@/enums/cacheEnum';
import {BusinessHy, BusinessType} from '@/services/model/business';
import {CouponType} from '@/services/model/coupon';

interface Setting {
    area: Area;
    area_nmae: string;
    access?: string;
    bgimg: string;
    couponTypeList: [CouponType];
    businessTypeList: [BusinessHy];
    businessHyTypeList: [BusinessType];
    integralProductsCategories: [IntegralCate];
    pointsCheckinRules: string;
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
        couponTypeList: getCache(COUPON_TYPE_LIST) || [],
        businessTypeList: getCache(BUSINESS_TYPE_LIST) || [],
        businessHyTypeList: getCache(BUSINESS_HY_TYPE_LIST) || [],
        integralProductsCategories: getCache(INTEGRAL_PRODUCTS_CATEGORIES) || [],
        pointsCheckinRules: getCache(POINTS_CHECKIN_RULES) || '',
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
                this.$state.businessTypeList = res.business_type;
                this.$state.businessHyTypeList = res.business_hy;
                this.$state.pointsCheckinRules = res.points_checkin_rules;
                this.$state.integralProductsCategories = res.integral_products_categories.map((item) => {
                    return {key: item.id, title: item.name, ...item};
                });
                setCache(COUPON_TYPE_LIST, this.$state.couponTypeList);
                setCache(BUSINESS_TYPE_LIST, this.$state.businessTypeList);
                setCache(BUSINESS_HY_TYPE_LIST, this.$state.businessHyTypeList);
                setCache(INTEGRAL_PRODUCTS_CATEGORIES, this.$state.integralProductsCategories);
                setCache(POINTS_CHECKIN_RULES, this.$state.pointsCheckinRules);
            });
        }
    },
});
