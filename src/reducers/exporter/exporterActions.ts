import {SET_EXPORT_FORMAT, SET_NUMBER_OF_EXPORT_ROWS, SET_FORMATTER_CONFIG} from "@/constants/actions";
import {ExportFormat} from "@/constants/enums";


// set number of exporter rows
export const doSetNumberOfExportRows = (rows: Number): any =>
    async dispatch => {
        dispatch({type: SET_NUMBER_OF_EXPORT_ROWS, payload: rows});
    };

// change export format
export const doChangeExportFormat = (type: ExportFormat, defaultConfig: any): any =>
    async dispatch => {
        dispatch({type: SET_EXPORT_FORMAT, payload: {type, defaultConfig}});
    };

// set formatter config
export const doSetFormatterConfig = (config: any): any =>
    async dispatch => {
        dispatch({type: SET_FORMATTER_CONFIG, payload: config});
    };
