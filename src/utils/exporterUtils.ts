import {Formatter} from "@/types/formatter";
import {ExportFormat} from "@/constants/enums";
import {formatters} from "@/core/formatters";


// Get formatters grouped by category
export const getFormattersGroupedByCategory = ():{} => {

    const categorizedFormatters: { [category: string]: Formatter[] } = {};

    for (const exportFormat of Object.values(ExportFormat)) {
        const formatter:Formatter = formatters[exportFormat];
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
export const getFormatterByFormat = (format:ExportFormat):Formatter => {
    return formatters[format];
}

// Gey formatter config component by format
export const getFormatterConfigComponentByFormat = (format:ExportFormat):any => {
    return formatters[format].configComponent;
}