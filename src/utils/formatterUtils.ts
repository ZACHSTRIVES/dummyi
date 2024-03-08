import {FormatRequest, Formatter} from "@/types/formatter";
import {ExportFormat} from "@/constants/enums";
import {formatters} from "@/core/formatters";
import {langs} from '@uiw/codemirror-extensions-langs';

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
        default:
            return langs.mathematica();
    }
}