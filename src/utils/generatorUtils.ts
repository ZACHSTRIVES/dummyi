import {generators} from "@/core/generators";
import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {DatetimeGenerator} from "@/core/generators/Datetime";

// get generator grouped by category list with search and locale
export const getGeneratorList = (search: string, intl: any): { [category: string]: Generator[] } => {
    const categorizedGenerator: { [category: string]: Generator[] } = {};
    categorizedGenerator[DataTypeCategory.ALL] = [];
    Object.values(DataType).forEach((dataType) => {
        const generator = generators[dataType];
        generator.displayName = intl.formatMessage({id: `dataType.${dataType}`});
        const category = generator.category;
        if (!categorizedGenerator[category]) {
            categorizedGenerator[category] = [];
        }
        if (!search || generator.displayName.toLowerCase().includes(search.toLowerCase())) {
            categorizedGenerator[DataTypeCategory.ALL].push(generator);
            categorizedGenerator[category].push(generator);
        }
    });
    return categorizedGenerator;
}
