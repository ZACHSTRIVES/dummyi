import {RootState} from "@/types/system";
import {createSelector} from "reselect";
import {
    selectCurrentDataTypeSelectModalTargetFieldId,
    selectDataFields, selectNumberOfExportRows,
    selectPreviewFormattedData
} from "@/reducers/workspace/workspaceSelectors";

export const selectShowExportModal = (state: RootState) => state.export.showExportModal;

export const selectEstimatedFileSize = createSelector(
    selectPreviewFormattedData,
    selectNumberOfExportRows,
    (previewFormattedData, numberOfExportRows) => {
        if (previewFormattedData.length === 0) {
            return 0;
        }
        const averageRowSize = previewFormattedData.length / 20;
        return averageRowSize * numberOfExportRows;
    }
);

