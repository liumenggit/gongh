import * as dayjs from '@/tmui/tool/dayjs/esm/index';

const DayJs = dayjs.default;

/**
 * 时间格式化
 * @param {number} time
 * @param {string} format
 * @returns {any}
 */
export function dateFormat(time: number, format = 'YYYY-MM-DD HH:mm:ss') {
    return DayJs(time * 1000).format(format);
}
