import {request} from '@/utils/http';
import {getBaseUrl, getPlatformId, getUploadUrl} from '@/utils/env';
import * as buffer from 'buffer';

/**
 * 发送验证码
 * @param {number} phone
  */
export function sendCode(phone: number) {
    return request.Get<any>('smsCode', {params: {phone}});
}

/**
 * 获取小区
  */
export function getVillageList() {
    return request.Get<[]>('get_village');
}

/**
 * 上传文件
 * @param file
 */
export function uploadOssFile(file: File) {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: getBaseUrl() + getUploadUrl(),
            fileType: 'image',
            file: file,
            name: 'file',
            formData: {'platform_id': getPlatformId()},
            success: (res) => {
                resolve(JSON.parse(res.data).data.path);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });

    // console.log('请求来', file);
    // return request.Post(getUploadUrl(), {
    //     name: 'file',
    //     formData: {'platform_id': 15, file},
    // }, {
    //     requestType: 'upload',
    //     fileType: 'image',
    //     enableUpload: false
    // });
}

/**
 * 获取轮播图
 */
export function getBannerList() {
    return request.Get<[Banner]>('banner_list', {
        transformData(rawData) {
            // @ts-ignore
            return rawData.map((item: any) => {
                // eslint-disable-next-line camelcase
                return {banner_img: item.banner_img};
            });
        }
    }
    );
}
