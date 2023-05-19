import {SET_EXPORT_TYPE, SET_NUMBER_OF_EXPORT_ROWS} from "@/constants/actions";
import {ExportType} from "@/constants/enums";


// set number of exporter rows
export const doSetNumberOfExportRows = (rows: Number): any =>
    async dispatch => {
        dispatch({type: SET_NUMBER_OF_EXPORT_ROWS, payload: rows});
    };

// change export type
export const doChangeExportType = (type: ExportType): any =>
    async dispatch => {
        dispatch({type: SET_EXPORT_TYPE, payload: type});
    };