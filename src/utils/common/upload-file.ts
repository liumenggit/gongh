import {file} from '@/tmui/components/tm-upload/upload';
import {ResultEnum} from '@/enums/httpEnum';
import {getBaseUrl, getPlatformId, getUploadUrl} from "@/utils/env";


/**
 * 判断是否上传成功
 * @param {file} item
 * @returns {boolean}
 */
const isUploadSuccess = (item: file) => {
    const d = item.response;
    let isOk = true;
    try {
        const p = JSON.parse(d);
        if (p?.code !== ResultEnum.SUCCESS) {
            isOk = false;
        }
    } catch (e) {
        isOk = false;
    }
    return isOk;
};

const uploadFileOss = (file: string) => {
    return new Promise((resolve, reject) => {
        uni.uploadFile({
            url: getBaseUrl() + getUploadUrl(),
            fileType: 'image',
            filePath: file,
            name: 'file',
            formData: {platform_id: getPlatformId()},
            success: (res) => {
                resolve(JSON.parse(res.data).data.path);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};

export {isUploadSuccess, uploadFileOss};
