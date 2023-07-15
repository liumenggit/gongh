/**
 * base64转临时地址
 * @param base64Str
 * @param callback
 */
export function convertBase64ToFile(base64Str: string, callback: any) {
    const fs = uni.getFileSystemManager();
    // @ts-ignore
    const filePath = `${wx.env.USER_DATA_PATH}/${(new Date()).getTime()}.jpeg`;
    const imageData = base64Str.replace(/^data:image\/\w+;base64,/, '');
    console.log('imageData', imageData);

    fs.writeFile({
        filePath: filePath,
        data: imageData,
        encoding: 'base64',
        success() {
            callback(filePath);
        }
    });
}

