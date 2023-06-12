import {Action, ExportReducerState} from "@/types/system";
import {SET_EXPORT_FILE_NAME, SET_EXPORT_PROCESS_STAGE, SET_SHOW_EXPORT_MODAL} from "@/constants/actions";
import {ExportProcessStage} from "@/constants/enums";
import {DEFAULT_EXPORT_FILE_NAME} from "@/constants/config";

export const initStates: ExportReducerState = {
    showExportModal: false,
    exportFileName: DEFAULT_EXPORT_FILE_NAME,
    exportProcessStage: ExportProcessStage.PREVIEW
}

const exportReducer = (state: ExportReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_SHOW_EXPORT_MODAL:
            return {
                ...state,
                showExportModal: action.payload
            };
        case SET_EXPORT_FILE_NAME:
            return {
                ...state,
                exportFileName: action.payload
            };
        case SET_EXPORT_PROCESS_STAGE:
            return {
                ...state,
                exportProcessStage: action.payload
            }
        default:
            return state;
    }
};

export default exportReducer;
