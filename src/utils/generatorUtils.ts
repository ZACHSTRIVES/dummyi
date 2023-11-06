import {generators} from "@/core/generators";
import {
    DataFieldList,
    GenerateDataBatchCompletedCallbackResponse,
    GenerateResult,
    Generator,
    GeneratorOptionsComponentInterface
} from "@/types/generator";
import {DataType, DataTypeCategory, ExportValueType} from "@/constants/enums";
import React from "react";

// Generate data
export const generateData = (fields: DataFieldList, sortableList: string[], count: number): any => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const row = {};
        sortableList.forEach((id) => {
            const field = fields[id];
            if (!field.isDraft) {
                if (!isEmptyField(field.emptyRate)) {
                    try {
                        row[id] = generateDataByDataType(field.dataType, field.dataTypeOptions);
                    } catch {
                        row[id] = getEmptyDataRow();
                    }
                } else {
                    row[id] = getEmptyDataRow();
                }
            }
        });
        data.push(row);
    }
    return data;
}

// Generate specific field data
export const generateSpecificFieldPreviewData = (fields: DataFieldList, sortableList: string[], currentData: any[], specificFieldId: string): any[] => {
    return currentData.map((rowData) => {
        const row: any = {};
        sortableList.forEach((id) => {
            const field = fields[id];
            if (!field.isDraft) {
                if (id === specificFieldId) {
                    if (!isEmptyField(field.emptyRate)) {
                        try {
                            row[id] = generators[field.dataType].generate(field.dataTypeOptions);
                        } catch {
                            row[id] = getEmptyDataRow();
                        }
                    } else {
                        row[id] = getEmptyDataRow();
                    }
                } else {
                    row[id] = rowData[id];
                }
            }
        });
        return row;
    });
}

// Delete specific field data
export const deleteSpecificFieldData = (fields: DataFieldList, sortableList: string[], currentData: any[], specificFieldId: string): any[] => {
    return currentData.map((rowData) => {
        return Object.fromEntries(
            sortableList
                .filter(id => id !== specificFieldId)
                .map(id => [id, rowData[id]])
        );
    });
}

// Get is empty line
export const isEmptyField = (emptyProb: number): boolean => {
    return Math.random() < (emptyProb / 100);
}

// Get generator grouped by category list with search and locale
export const getGeneratorList = (search: string, intl: any): { [category: string]: Generator[] } => {
    const categorizedGenerator: { [category: string]: Generator[] } = {
        [DataTypeCategory.ALL]: []
    };

    for (const dataType of Object.values(DataType)) {
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
    }

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

// Get empty data row
export const getEmptyDataRow = (): GenerateResult => {
    return {
        value: null,
        stringValue: null,
        type: ExportValueType.NULL
    }
}

// Generate data by data type
export const generateDataByDataType = (dataType: DataType, options: any): GenerateResult => {
    return generators[dataType].generate(options);
}

// Batch generation
export const batchGenerateData = async (fields: DataFieldList, sortableList: string[], count: number, callback: (data: any) => void): Promise<void> => {
    const batchSize = 100000;
    const batchCount = Math.ceil(count / batchSize);
    let totalTime = 0;
    let totalNumOfRowsGenerated = 0;

    for (let i = 0; i < batchCount; i++) {
        const startTime = performance.now();
        let generateCount = batchSize;
        if (i === batchCount - 1) {
            generateCount = count - batchSize * i;
        }
        const batchData = generateData(fields, sortableList, generateCount);
        const endTime = performance.now();
        const batchTimeElapsed = endTime - startTime;
        totalTime += batchTimeElapsed;
        totalNumOfRowsGenerated += generateCount;

        const response: GenerateDataBatchCompletedCallbackResponse = {
            batchIndex: i,
            batchCount: generateCount,
            batchTimeElapsed: batchTimeElapsed,
            totalTimeElapsed: totalTime,
            totalNumOfRowsGenerated: totalNumOfRowsGenerated
        };
        callback(response);
        await new Promise(resolve => setTimeout(resolve, 100));
    }
};
