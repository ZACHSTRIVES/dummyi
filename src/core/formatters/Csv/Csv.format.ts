import {FormatRequest} from "@/types/formatter";
import {boolToString} from "@/utils/typeUtils";

export const format = (request: FormatRequest): string => {
    const {fields, values, config} = request;
    const {delimiter, includeHeader, endOfLineChar} = config;
    let output = '';

    if (values.length === 0) {
        return output;
    }

    if (includeHeader) {
        const header = fields.map((field) => {
            return field.fieldName;
        });
        output += header.join(delimiter) + endOfLineChar;
    }

    const rows = values.map((row) => {
        return row.map((value) => {
            if (typeof value === 'boolean') {
                value = boolToString(value); // Convert boolean to string
            } else if (typeof value === 'string') {
                value = value.replace(/"/g, '""'); // Escape double quotes
                if (value.includes(delimiter) || value.includes(endOfLineChar)) {
                    value = `"${value}"`; // Enclose in double quotes if necessary
                }
            }
            return value;
        });
    });

    output += rows.map((row) => row.join(delimiter) + endOfLineChar).join('');
    return output;
}