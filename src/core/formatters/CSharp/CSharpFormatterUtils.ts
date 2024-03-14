import {GenerateResult} from "@/types/generator";
import {ValueType} from "@/constants/enums";
import {hasValue} from "@/utils/typeUtils";


// Helper function to format field values into C# code, based on the field type.
// You would need to adapt this based on your data structure and needs.
export function formatValueForCSharp(generateResult: GenerateResult, valueType: ValueType): string {
    const {value} = generateResult;

    if (!hasValue(value)) {
        return 'null'
    }

    switch (valueType) {
        case ValueType.INT:
        case ValueType.DOUBLE:
        case ValueType.BIGINT:
        case ValueType.BOOLEAN:
        case ValueType.ONE_BIT:
            return value.toString();
        case ValueType.STRING:
        case ValueType.TEXT:
            return `"${value.replace(/"/g, '\\"')}"`; // Escape double quotes in C# strings
        case ValueType.INT_LIST:
            return `new List<int> { ${value.join(", ")} }`
        case ValueType.STRING_LIST:
            return `new List<string> { ${value.map(item => `"${item}"`).join(', ')})} }`
        case ValueType.DATE_TIME:
            return `DateTime.Parse("${toCSharpDateTimeFormat(value)}")`
        default:
            return 'null'; // Or some other default case
    }
}

export function toCSharpDateTimeFormat(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的
    const day = String(date.getDate()).padStart(2, '0');

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}