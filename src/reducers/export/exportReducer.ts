import {Action, ExportReducerState} from "@/types/system";
import {SET_SHOW_EXPORT_MODAL} from "@/constants/actions";


export const initStates: ExportReducerState = {
    showExportModal: false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ExportReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_SHOW_EXPORT_MODAL:
            return {
                ...state,
                showExportModal: action.payload
            };
        default:
            return state;
    }
}
