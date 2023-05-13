import {Action, ExporterReducerState} from "@/types/system";
import {SET_NUMBER_OF_EXPORT_ROWS} from "@/constants/actions";
import {DEFAULT_NUMBER_EXPORT_ROWS} from "@/constants/core";

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


