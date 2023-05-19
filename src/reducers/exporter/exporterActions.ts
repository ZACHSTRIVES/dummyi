import {SET_EXPORT_FORMAT, SET_NUMBER_OF_EXPORT_ROWS} from "@/constants/actions";
import {ExportFormat} from "@/constants/enums";


// set number of exporter rows
export const doSetNumberOfExportRows = (rows: Number): any =>
    async dispatch => {
        dispatch({type: SET_NUMBER_OF_EXPORT_ROWS, payload: rows});
    };

// change export format
export const doChangeExportFormat = (type: ExportFormat): any =>
    async dispatch => {
        dispatch({type: SET_EXPORT_FORMAT, payload: type});
    };