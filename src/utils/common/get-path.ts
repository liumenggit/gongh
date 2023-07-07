/**
 * 正则匹配域名
 * @param {string} string
 * @returns {string}
 */
function escapeRegExp(string: string) {
    const Re = /.*?(?=\/pages)/;
    // @ts-ignore
    return Re.exec(string)[0];
}

export {escapeRegExp};
