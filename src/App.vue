<script setup lang="ts">
import {onHide, onLaunch, onShow} from '@dcloudio/uni-app';
import {judgePlatform} from './utils/platform';
import {CURRENT_PLATFORM, PLATFORMS} from './enums/platformEnum';
import {useUserStore} from '@/state/modules/user';
import {removeInterceptor, setupInterceptors} from '@/utils/interceptors';
import {useRouterStore} from '@/state/modules/router';
import {useAuthStore} from "@/state/modules/auth";

const platform = CURRENT_PLATFORM;
const isVue3 = judgePlatform(PLATFORMS.VUE3);
const apiUrl = import.meta.env.VITE_BASE_URL;
const platformId = import.meta.env.VITE_PLATFORM_ID;
const appid = import.meta.env.VITE_APP_ID;
const version = import.meta.env.VITE_VERSION;
const appTitle = import.meta.env.VITE_APP_TITLE;
onLaunch(() => {
    console.log(
        `\n%cTITLE%c${appTitle}%cUNIAPP%c${platform}%cVUE%c${isVue3 ? '3' : '2'}%cVERSION%c${version}%cAPP_ID%c${appid}%cPLATFORM_ID%c${platformId}%cAPI%c${apiUrl}%c\n`,
        'background:black;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        'background:#2b993a;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        'background:#41B883;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        'background:#007ec6;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        'background:#5CC928;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        'background:#e05d44;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        'background:#A97BFF;color:#fff;padding:3px 6px;border-radius:4px 0 0 4px;',
        'background:#fff;padding:3px 6px;color:#000;margin-right:1em;border-radius:0 4px 4px 0;',
        '',
    );
    console.log('App Launch');
    removeInterceptor();

    setupInterceptors();
    const appStore = useRouterStore();
    appStore.initialize();
});
onShow(() => {
    const authStore = useAuthStore();
    authStore.initToken();
    console.log('App Show');
});
onHide(() => {
    console.log('App Hide');
});
</script>

<style lang="scss">
/* #ifdef APP-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-NVUE */
//自定义图标
@import '@/static/icon/custom.css';
@import './tmui/scss/noNvue.css';
/* #endif */

@import '@/assets/main.scss';
</style>
