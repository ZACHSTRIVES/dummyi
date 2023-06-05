import {FormatRequest} from "@/types/formatter";

export const format = (request: FormatRequest): string => {
    const {fields, values, config} = request;
    const {delimiter, includeHeader, endOfLineChar} = config;
    let output = '';

    if (values.length === 0) {
        return output;
    }

    const header = fields.map((field) => {
        return field.fieldName;
    });

    if (includeHeader) {
        output += header.join(delimiter) + endOfLineChar;
    }

    const rows = values.map((item) => {
        return header.map((column) => {
            let value = item[column];
            if (typeof value === 'string') {
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