import {generators} from "@/core/generators";
import {DataFieldList, Generator, GeneratorOptionsComponentInterface} from "@/types/generator";
import {DataType, DataTypeCategory, ExportValueType} from "@/constants/enums";
import React from "react";

// generate data
export const generateData = (fields: DataFieldList, sortableList: string[], count: number): any => {
    const data: any[] = [];
    for (let i = 0; i < count; i++) {
        const row: any = {};
        sortableList.forEach((id) => {
            const field = fields[id];
            if (!field.isDraft) {
                if (!isEmptyField(field.emptyRate)) {
                    try {
                        row[field.fieldName] = generators[field.dataType].generate(field.dataTypeOptions);
                    } catch {
                        row[field.fieldName] = {
                            value: null,
                            stringValue: null,
                            type: ExportValueType.NULL
                        }
                    }
                } else {
                    row[field.fieldName] = {
                        value: null,
                        stringValue: null,
                        type: ExportValueType.NULL
                    }
                }
            }
        });
        data.push(row);
    }
    return data;
}

// generate specific data
export const generateSpecificFieldData = (fields: DataFieldList, sortableList: string[], currentData: any[], specificFieldId: string): any[] => {
    return currentData.map((rowData) => {
        const row: any = {};
        sortableList.forEach((id) => {
            const field = fields[id];
            if (!field.isDraft) {
                if (id === specificFieldId) {
                    if (!isEmptyField(field.emptyRate)) {
                        try{
                            row[field.fieldName] = generators[field.dataType].generate(field.dataTypeOptions);
                        } catch {
                            row[field.fieldName] = {
                                value: null,
                                stringValue: null,
                                type: ExportValueType.NULL
                            }
                        }
                    } else {
                        row[field.fieldName] = {
                            value: null,
                            stringValue: null,
                            type: ExportValueType.NULL
                        }
                    }
                } else {
                    row[field.fieldName] = rowData[field.fieldName];
                }
            }
        });
        return row;
    });
}

// delete specific field data
export const deleteSpecificFieldData = (fields: DataFieldList, sortableList: string[], currentData: any[], specificFieldId: string): any[] => {
    return currentData.map((rowData) => {
        const row: any = {};
        sortableList.forEach((id) => {
            const field = fields[id];
            if (id !== specificFieldId) {
                row[field.fieldName] = rowData[field.fieldName];
            }
        });
        return row;
    });
}


// get is empty line
export const isEmptyField = (emptyProb: number): boolean => {
    return Math.random() < (emptyProb / 100);
}

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

// Get generator config components by data type
export const getGeneratorOptionsComponentByDataType = (dataType: DataType): React.FunctionComponent<GeneratorOptionsComponentInterface> => {
    return generators[dataType].optionsComponent
}

// Get generator default options by data type
export const getGeneratorDefaultOptionsByDataType = (dataType: DataType): any => {
    return generators[dataType].defaultOptions;
}