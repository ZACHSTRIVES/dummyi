import {FormatRequest, Formatter} from "@/types/formatter";
import {ExportFormat} from "@/constants/enums";
import {formatters} from "@/core/formatters";
import {langs} from '@uiw/codemirror-extensions-langs';
import {DataFieldList} from "@/types/generator";

// format data
export const formatData = (request: FormatRequest): string => {
    const {fields, sortedFieldIds} = request;

    // Filter out field IDs where the corresponding field is a draft
    const filteredFieldIds = sortedFieldIds.filter(fieldId => !fields[fieldId].isDraft);

    // Construct a new fields object without the draft fields
    const filteredFields = {};
    filteredFieldIds.forEach(fieldId => {
        filteredFields[fieldId] = fields[fieldId];
    });

    // Replace the request fields with the filtered fields and sortedFieldIds with filteredFieldIds
    const updatedRequest = {
        ...request,
        fields: filteredFields,
        sortedFieldIds: filteredFieldIds,
    };

    if (filteredFieldIds.length === 0) {
        return ""
    } else {
        return formatters[request.format].format(updatedRequest);
    }

}

// Get formatters grouped by category
export const getFormattersGroupedByCategory = (): {} => {

    const categorizedFormatters: { [category: string]: Formatter[] } = {};

    for (const exportFormat of Object.values(ExportFormat)) {
        const formatter: Formatter = formatters[exportFormat];
        const category = formatter.category;

        if (categorizedFormatters[category]) {
            categorizedFormatters[category].push(formatter);
        } else {
            categorizedFormatters[category] = [formatter];
        }
    }


    return categorizedFormatters;
}

// Get formatter by format
export const getFormatterByFormat = (format: ExportFormat): Formatter => {
    return formatters[format];
}

// Get formatter default config by format
export const getFormatterDefaultConfigByFormat = (format: ExportFormat): any => {
    return formatters[format].defaultConfig;
}

// Get formatter config component by format
export const getFormatterConfigComponentByFormat = (format: ExportFormat): any => {
    return formatters[format].configComponent;
}

// Get file extension by format
export const getFileExtensionByFormat = (format: ExportFormat): string => {
    return formatters[format].fileExtension;
}

// Get codemirror language plugin by format
export const getCodemirrorLanguagePluginByFormat = (format: ExportFormat): any => {
    switch (format) {
        case ExportFormat.JSON:
            return langs.json();
        case ExportFormat.XML:
            return langs.xml();
        case ExportFormat.CSV:
            return langs.spreadsheet();
        case ExportFormat.JAVA_SCRIPT:
            return langs.javascript();
        case ExportFormat.SQL:
            return langs.sql();
        case ExportFormat.CSHARP:
            return langs.csharp();
        case ExportFormat.TYPESCRIPT:
            return langs.typescript();
        default:
            return langs.mathematica();
    }
}

// Get json string without quotes in field names
export function toJsonListStringWithoutQuotes(fields: DataFieldList, sortedFieldIds: string[], values: any[]): string {
    const convert = (value: any, indent = 2): string => { // 改为直接处理任意值
        const indentSpace = ' '.repeat(indent);
        const nextIndentSpace = ' '.repeat(indent + 2);

        if (Array.isArray(value)) { // 处理数组格式
            const elements = value.map(element => convert(element, indent + 2));
            return `[\n${nextIndentSpace}${elements.join(`,\n${nextIndentSpace}`)}\n${indentSpace}]`;
        } else if (typeof value === 'object' && value !== null) { // 处理对象格式
            const entries = Object.entries(value).map(([key, val]) => {
                const formattedValue = convert(val, indent + 2);
                return `${nextIndentSpace}${key}: ${formattedValue}`;
            });
            return `{\n${entries.join(',\n')}\n${indentSpace}}`;
        } else { // 处理基础类型
            return JSON.stringify(value);
        }
    };

    let output = "[\n"; // 开始数组并添加换行符
    values.forEach((item, index) => {
        const row: Record<string, any> = {}; // 允许任何类型的值
        for (const column of sortedFieldIds) {
            const field = fields[column];
            const {isDraft, fieldName} = field;
            const itemValue = item[column];
            let {value} = itemValue;

            if (!isDraft && value !== null) {
                if (typeof value === 'bigint') {
                    value = value.toString(); // 处理 bigint 为字符串
                }
                row[fieldName] = value;
            }
        }
        // 添加对象到数组，确保正确的缩进和换行
        output += `  ${convert(row)}${index < values.length - 1 ? ',\n' : '\n'}`;
    });

    output += "]"; // 结束数组
    return output;
}
