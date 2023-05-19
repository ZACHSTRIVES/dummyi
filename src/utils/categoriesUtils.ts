import {Formatter} from "@/types/formatter";
import {ExportFormat} from "@/constants/enums";


// Get formatters grouped by category
export const getFormattersGroupedByCategory = (formatters:{}):{} => {

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