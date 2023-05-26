import {Store} from "@/types/system";

export const selectPanelsOrientation = (state: Store) => state.workspace.panelsOrientation;
export const selectDataFields = (state: Store) => state.workspace.dataFields;
export const selectShowDataTypeSelectModal = (state: Store) => state.workspace.showDataTypeSelectModal;
export const selectCurrentDataTypeSelectModalTargetField = (state: Store) => state.workspace.currentDataTypeSelectModalTargetField;
export const selectShowDataTypeOptionsModal = (state: Store) => state.workspace.showDataTypeOptionsModal;
export const selectCurrentDataTypeOptionsModalTargetField = (state: Store) => state.workspace.currentDataTypeOptionsModalTargetField;