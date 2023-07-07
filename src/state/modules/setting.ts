import {defineStore} from 'pinia';
import {getCache} from '@/utils/cache';
import {setCache} from 'alova';

interface Setting {
    area: string;
    access?: string;
}

export const useSettingStore = defineStore('setting', {
    state: (): Setting => ({
        area: getCache('area') || 'area-1',
    }),
    getters: {
        getArea: (state) => {
            // return state.token ? {authorization: `Bearer ${state.token}`} : {};
            return state.area ? {'current_value': state.area} : {};
        },
    },
    actions: {
        setArea(area: string) {
            this.$state.area = area;
            setCache('area', area);
        }
    },
});
