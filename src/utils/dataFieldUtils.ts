import {DataType} from "@/constants/enums";
import {DataFieldList} from "@/types/generator";

// generate default field name
export const generateDefaultFieldName = (fieldType: DataType, dataFieldList: DataFieldList, sortableIdList: string[]): string => {
    const defaultFieldName = fieldType.toLowerCase();
    let suffixCount = 1;
    let uniqueFieldName = defaultFieldName;

    for (const sortableId of sortableIdList) {
        const field = dataFieldList[sortableId];
        if (field.fieldName === uniqueFieldName) {
            uniqueFieldName = `${defaultFieldName}${suffixCount}`;
            suffixCount++;
        }
    }
    return uniqueFieldName;
}