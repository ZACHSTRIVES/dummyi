import {Action, ExportReducerState} from "@/types/system";
import {SET_EXPORT_FILE_NAME, SET_SHOW_EXPORT_MODAL} from "@/constants/actions";

export const initStates: ExportReducerState = {
    showExportModal: false,
    exportFileName: 'data-export',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ExportReducerState = initStates, action: Action) => {
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
            }
        default:
            return state;
    }
}
