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
        default:
            return 'null'; // Or some other default case
    }
}