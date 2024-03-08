import {RootState} from "@/types/system";
import {createSelector} from "reselect";

//panels orientation
export const selectPanelsOrientation = (state: RootState) => state.workspace.panelsOrientation;


// data fields
export const selectDataFields = (state: RootState) => state.workspace.dataFields;
export const selectDataFieldsSortableIdsList = (state: RootState) => state.workspace.dataFieldsSortableIdsList;
export const selectNumbersOfDataFields = createSelector(
    selectDataFields,
    (dataFields) => Object.keys(dataFields).length);


// data type select modal
export const selectShowDataTypeSelectModal = (state: RootState) => state.workspace.showDataTypeSelectModal;
export const selectCurrentDataTypeSelectModalTargetFieldId = (state: RootState) => state.workspace.currentDataTypeSelectModalTargetFieldId;
export const selectCurrentDataTypeSelectModalTargetField = createSelector(
    selectDataFields,
    selectCurrentDataTypeSelectModalTargetFieldId,
    (dataFields, id) => dataFields[id]
);


// data type options modal
export const selectShowDataTypeOptionsModal = (state: RootState) => state.workspace.showDataTypeOptionsModal;
export const selectCurrentDataTypeOptionsModalTargetFieldId = (state: RootState) => state.workspace.currentDataTypeOptionsModalTargetFieldId;
export const selectCurrentDataTypeOptionsModalTargetField = createSelector(
    selectDataFields,
    selectCurrentDataTypeOptionsModalTargetFieldId,
    (dataFields, id) => dataFields[id]
)

// preview data
export const selectPreviewData = (state: RootState) => state.workspace.previewData;
export const selectPreviewFormattedData = (state: RootState) => state.workspace.previewFormattedData;

// export
export const selectExportFormat = (state: RootState) => state.workspace.exportFormat;
export const selectNumberOfExportRows = (state: RootState) => state.workspace.numberOfExportRows;
export const selectFormatterConfig = (state: RootState) => state.workspace.formatterConfig;


