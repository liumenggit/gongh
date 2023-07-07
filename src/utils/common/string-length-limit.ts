export function stringLengthLimit(str: string, length = 10) {
    return str.length > 10 ? str.slice(0, length) + '...' : str;
}
