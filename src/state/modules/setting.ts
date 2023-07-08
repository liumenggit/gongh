import {defineStore} from 'pinia';
import {getCache} from '@/utils/cache';
import {setCache} from 'alova';

interface Setting {
    area: Area;
    area_nmae: string;
    access?: string;
    bgimg: string;
}

interface Area {
    id: number,
    name: string,
    type: string
}

export const useSettingStore = defineStore('setting', {
    state: (): Setting => ({
        area: getCache('area') || {name: '海拉尔', type: 'area', id: 1},
        area_nmae: getCache('area_nmae') || '选择地区',
        bgimg: 'https://wx.shuidiwang.cn/addons/china_ghphpt/resource/mobileImg/loginBg.jpg'
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
            setCache('area', area);
        }
    },
});
