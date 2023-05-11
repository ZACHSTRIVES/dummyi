import {Action, AppReducerState, ExportReducerState} from "@/types/system";
import {ColorMode} from "@/constents/enums";
import {SET_COLOR_MODE} from "@/constents/actions";

export const initStates:ExportReducerState = {
    numberOfExportRows: 20,
}

export default (state: ExportReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_COLOR_MODE:
            return {
                ...state,
                colorMode: action.payload,
            }
        default:
            return state;
    }
}


