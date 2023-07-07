// import Base64 from 'crypto-js/enc-base64';
import * as base64js from 'base64-js';

export function base64toBlob(base64: string) {
    // 解析base64字符串的前缀获取类型
    const prefix = base64.substring(0, 30);
    let type = '';
    if (prefix.indexOf('data:image/png') !== -1) {
        type = 'image/png';
    } else if (prefix.indexOf('data:image/jpeg') !== -1) {
        type = 'image/jpeg';
    } else if (prefix.indexOf('data:image/gif') !== -1) {
        type = 'image/gif';
    } else {
        console.error('Unsupported image type!');
        return null;
    }
    // 将base64字符串转换为二进制数据
    const binaryData = atob(base64.split(',')[1]);
    // 创建一个Uint8Array来保存二进制数据
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
    }
    // 创建Blob对象并返回
    return new Blob([array], {type: type});
}

/**
 * Base64转File类型
 * @param {string} base64Data
 * @returns {File}
 */
export function base64ToFile(base64Data: string) {
    const base64Str = base64Data.split(',')[1];
    const fileType = base64Data.split(';')[0].split('/')[1];
    const binaryData = atob(base64Str);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
        array[i] = binaryData.charCodeAt(i);
    }
    return new File([array], `file.${fileType}`, {type: `image/${fileType}`});
}
