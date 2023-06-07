import {Store} from "@/types/system";
import {createSelector} from "reselect";

//panels orientation
export const selectPanelsOrientation = (state: Store) => state.workspace.panelsOrientation;


// data fields
export const selectDataFields = (state: Store) => state.workspace.dataFields;
export const selectDataFieldsSortableIdsList = (state: Store) => state.workspace.dataFieldsSortableIdsList;
export const selectNumbersOfDataFields = createSelector(
    selectDataFields,
    (dataFields) => Object.keys(dataFields).length);


// data type select modal
export const selectShowDataTypeSelectModal = (state: Store) => state.workspace.showDataTypeSelectModal;
export const selectCurrentDataTypeSelectModalTargetFieldId = (state: Store) => state.workspace.currentDataTypeSelectModalTargetFieldId;
export const selectCurrentDataTypeSelectModalTargetField = createSelector(
    selectDataFields,
    selectCurrentDataTypeSelectModalTargetFieldId,
    (dataFields, id) => dataFields[id]
);


// data type options modal
export const selectShowDataTypeOptionsModal = (state: Store) => state.workspace.showDataTypeOptionsModal;
export const selectCurrentDataTypeOptionsModalTargetFieldId = (state: Store) => state.workspace.currentDataTypeOptionsModalTargetFieldId;
export const selectCurrentDataTypeOptionsModalTargetField = createSelector(
    selectDataFields,
    selectCurrentDataTypeOptionsModalTargetFieldId,
    (dataFields, id) => dataFields[id]
)

// preview data
export const selectPreviewData = (state: Store) => state.workspace.previewData;
export const selectPreviewFormattedData = (state: Store) => state.workspace.previewFormattedData;

// export
export const selectExportFormat = (state: Store) => state.workspace.exportFormat;
export const selectNumberOfExportRows = (state: Store) => state.workspace.numberOfExportRows;
export const selectFormatterConfig = (state: Store) => state.workspace.formatterConfig;
