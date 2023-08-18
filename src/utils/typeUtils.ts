// determine if a value is null or undefined
export const isNullOrUndefined = (value: any): boolean => {
    return value === null || value === undefined || value === '';
}

// calculate the byte size of a string
export const calculateByteSize = (str: string) => {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(str);
    return encodedData.length;
}