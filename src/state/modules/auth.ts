import {defineStore} from 'pinia';
import {getCache, setCache} from '@/utils/cache';
import {TOKEN_KEY, TOKEN_REFRESH_KEY} from '@/enums/cacheEnum';

interface AuthState {
    token?: string;
    access?: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        token: undefined,
        access: undefined
    }),
    getters: {
        getToken: (state) => state.token || '',
        isLogin: (state): boolean => !!state.token,
        getAuthorization: (state) => {
            return state.token ? {Authorization: `Bearer ${state.token}`} : {};
            // return state.token ? {token: state.token} : {};
        },
    },
    actions: {
        initToken() {
            this.token = getCache<string>(TOKEN_KEY) || undefined;
        },
        setToken(token: string | undefined) {
            setCache(TOKEN_KEY, token);
            this.token = token;
        },
        setTokenRefresh(token: string | undefined) {
            setCache(TOKEN_REFRESH_KEY, token);
            this.access = token;
        }
    },
});
