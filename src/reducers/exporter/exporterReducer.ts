import {Action, ExporterReducerState} from "@/types/system";
import {SET_EXPORT_TYPE, SET_NUMBER_OF_EXPORT_ROWS} from "@/constants/actions";
import {DEFAULT_NUMBER_EXPORT_ROWS} from "@/constants/core";
import {ExportType} from "@/constants/enums";

export const initStates: ExporterReducerState = {
    exportType: ExportType.CSV,
    numberOfExportRows: DEFAULT_NUMBER_EXPORT_ROWS,
}

export default (state: ExporterReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_NUMBER_OF_EXPORT_ROWS:
            return {
                ...state,
                numberOfExportRows: action.payload
            }
        case SET_EXPORT_TYPE:
            return {
                ...state,
                exportType: action.payload
            }
        default:
            return state;
    }
}


