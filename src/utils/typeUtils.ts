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

// check variable has value
export function hasValue(variable: any): boolean {
    return variable !== null && variable !== undefined;
}

export function toDateString(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export function toDateTimeString(date: Date): string {
    const formattedDate = toDateString(date); // Reuse formatDate function
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${formattedDate} ${hours}:${minutes}:${seconds}`;
}