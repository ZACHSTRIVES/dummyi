export const isNullOrWhiteSpace = (str: string): boolean => {
    return !str || str.length === 0 || /^\s*$/.test(str);
}