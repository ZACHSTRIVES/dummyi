// convert boolean to string
// e.g. true -> 'true', false -> 'false'
export const boolToString = (value: boolean): string => {
    return value ? 'true' : 'false';
}

export const isNullOrUndefined = (value: any): boolean => {
    return value === null || value === undefined || value === '';
}