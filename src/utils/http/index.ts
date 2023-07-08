import {useUserStore} from '@/state/modules/user';
import {toast} from '@/tmui/tool/function/util';
import {createAlova} from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';
import {assign} from 'lodash-es';
import {getBaseUrl, getPlatformId, isDevMode} from '@/utils/env';
import {checkStatus} from '@/utils/http/checkStatus';
import {ContentTypeEnum, ResultEnum} from '@/enums/httpEnum';
import type {API} from '@/services/model/baseModel';
import {Token} from '@/services/model/user';
import {mockAdapter} from '@/mock';
import {useAuthStore} from '@/state/modules/auth';
import {useSettingStore} from '@/state/modules/setting';

const BASE_URL = getBaseUrl();
const PLATFORM_ID = getPlatformId();

const HEADER = {
    'Content-Type': ContentTypeEnum.JSON,
    'Accept': 'application/json, text/plain, */*',
    'platform-id': PLATFORM_ID
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
    baseURL: BASE_URL,
    ...AdapterUniapp({
        // mockRequest: isDevMode() ? mockAdapter : undefined,
    }),
    timeout: 5000,
    beforeRequest: (method) => {
        const authStore = useAuthStore();
        method.config.headers = assign(method.config.headers, HEADER, authStore.getAuthorization);
        method.config.params = assign(method.config.params,useSettingStore().getArea);
    },
    responsed: {
        /**
         * 请求成功的拦截器
         * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
         * @param response
         * @param method
         */
        onSuccess: async (response, method) => {
            const {config} = method;
            const {
                enableDownload,
                enableUpload,
            } = config;
            const {
                statusCode,
                // @ts-ignore
                data: rawData,
            } = response;
            const {
                state,
                msg,
                data,
                error
            } = rawData as API;
            if (statusCode === 200) {
                if (enableDownload) {
                    // 下载处理
                    return rawData;
                }
                if (enableUpload) {
                    // 上传处理
                    if (state === ResultEnum.UPLOAD_ERROR)
                        return Promise.reject(rawData);
                    return rawData;
                }
                if (state === ResultEnum.SUCCESS) {
                    return data;
                }
                if (state === ResultEnum.UPDATE_TOKEN) {
                    const access = alovaInstance.Get<Token>('/user_access_to_token', {
                        params: {
                            access: useUserStore()._token.access
                        }
                    });
                    const response = await access.send();
                    method.config.headers.token = response?.token || undefined;
                    useUserStore().setToken(response?.token || undefined);
                    return await method.send();

                }

                // message && toast(message);
                error && toast(error);
                return Promise.reject(rawData);
            }
            checkStatus(statusCode, msg || '');
            return Promise.reject(rawData);
        },

        /**
         * 请求失败的拦截器，请求错误时将会进入该拦截器。
         * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
         * @param err
         * @param method
         */
        onError: (err, method) => {
            // error('Request Error!');
            return Promise.reject({
                err,
                method,
            });
        },
    },
});

export const request = alovaInstance;
