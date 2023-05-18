import {Formatter} from "@/types/formatter";
import {ExportType} from "@/constants/enums";

// Get formatters grouped by category
export const getFormattersGroupedByCategory = (formatters:{}):{} => {

    const categorizedFormatters: { [category: string]: Formatter[] } = {};

    for (const exportType of Object.values(ExportType)) {
        const formatter:Formatter = formatters[exportType];
        const category = formatter.category;

        if (categorizedFormatters[category]) {
            categorizedFormatters[category].push(formatter);
        } else {
            categorizedFormatters[category] = [formatter];
        }
    }

    return categorizedFormatters;
}