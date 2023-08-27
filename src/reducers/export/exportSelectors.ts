import {RootState} from "@/types/system";
import {createSelector} from "reselect";
import {
    selectDataFields, selectDataFieldsSortableIdsList, selectExportFormat, selectFormatterConfig,
    selectNumberOfExportRows,
    selectPreviewFormattedData
} from "@/reducers/workspace/workspaceSelectors";
import {calculateByteSize} from "@/utils/typeUtils";
import {generateData} from "@/utils/generatorUtils";

export const selectShowExportModal = (state: RootState) => state.export.showExportModal;
export const selectExportFileName = (state: RootState) => state.export.exportFileName;
export const selectExportProcessStage = (state: RootState) => state.export.exportProcessStage;
export const selectIsCanceled = (state: RootState) => state.export.isCanceled;
export const selectCurrentNumOfRowsGenerated = (state: RootState) => state.export.currentNumOfRowsGenerated;
export const selectSparkLineData = (state: RootState) => state.export.sparkLineData;
export const selectFormattedExportData = (state: RootState) => state.export.formattedExportData;
export const selectEstimatedFileSize = createSelector(
    selectPreviewFormattedData,
    selectNumberOfExportRows,
    (previewFormattedData, numberOfExportRows) => {
        if (previewFormattedData.length === 0) {
            return 0;
        }
        const averageSize = calculateByteSize(previewFormattedData) / 20;
        return averageSize * numberOfExportRows;
    }
);

export const selectPreviewEstimatedTime = createSelector(
    selectDataFields,
    selectDataFieldsSortableIdsList,
    selectNumberOfExportRows,
    selectExportFormat,
    selectFormatterConfig,
    (dataFields, sortableIdList, numberOfExportRows, exportFormat, config) => {
        const startTime = performance.now();
        const data = generateData(dataFields, sortableIdList, 20).length;
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        const averageTime = executionTime / 20;
        console.log(averageTime * numberOfExportRows);
        return averageTime * numberOfExportRows;
    }
);

