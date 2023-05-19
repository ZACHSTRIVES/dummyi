import {Action, ExporterReducerState} from "@/types/system";
import {SET_EXPORT_FORMAT, SET_FORMATTER_CONFIG, SET_NUMBER_OF_EXPORT_ROWS} from "@/constants/actions";
import {DEFAULT_NUMBER_EXPORT_ROWS} from "@/constants/core";
import {ExportFormat} from "@/constants/enums";
import {CsvFormatter} from "@/core/formatters/Csv";

export const initStates: ExporterReducerState = {
    exportFormat: ExportFormat.CSV,
    numberOfExportRows: DEFAULT_NUMBER_EXPORT_ROWS,
    formatterConfig: CsvFormatter.defaultConfig
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: ExporterReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_NUMBER_OF_EXPORT_ROWS:
            return {
                ...state,
                numberOfExportRows: action.payload
            }
        case SET_EXPORT_FORMAT:
            return {
                ...state,
                exportFormat: action.payload.type,
                formatterConfig: action.payload.defaultConfig
            }
        case SET_FORMATTER_CONFIG:
            return {
                ...state,
                formatterConfig: action.payload
            }
        default:
            return state;
    }
}


