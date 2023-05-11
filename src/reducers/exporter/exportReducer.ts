import {Action, ExporterReducerState} from "@/types/system";
import {SET_COLOR_MODE, SET_NUMBER_OF_EXPORT_ROWS} from "@/constents/actions";
import {DEFAULT_NUMBER_EXPORT_ROWS} from "@/constents/core";

export const initStates:ExporterReducerState = {
    numberOfExportRows: DEFAULT_NUMBER_EXPORT_ROWS,
}

export default (state: ExporterReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_NUMBER_OF_EXPORT_ROWS:
            return {
                ...state,
                numberOfExportRows:action.payload
            }
        default:
            return state;
    }
}


