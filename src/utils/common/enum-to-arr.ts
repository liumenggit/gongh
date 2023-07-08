/**
 * 将枚举类转换为[{}]
 * @param enumArr
 * @param {string} keyStr
 * @returns {{[p: string]: any, key: unknown}[]}
 */
export function enumToArr(enumArr: any, keyStr = 'title'): { title?: any; [key: string]: any; key: number | string }[] {
    return Object.values(enumArr).filter((v) => !isNaN(Number(v))).map(key => ({
        key: key,
        [keyStr]: enumArr[Number(key)]
    }));
}
