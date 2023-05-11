import {SET_NUMBER_OF_EXPORT_ROWS} from "@/constents/actions";
import {ColorMode} from "@/constents/enums";


// set number of exporter rows
export const doSetNumberOfExportRows = (rows: Number): any =>
    async dispatch => {
        dispatch({type: SET_NUMBER_OF_EXPORT_ROWS, payload: rows});
    }