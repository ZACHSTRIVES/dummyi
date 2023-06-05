import {
    SET_EXPORT_FORMAT,
    SET_NUMBER_OF_EXPORT_ROWS,
    SET_FORMATTER_CONFIG,
    SET_PREVIEW_FORMATTED_DATA
} from "@/constants/actions";
import {ExportFormat} from "@/constants/enums";
import {formatData, getFormatterByFormat} from "@/utils/formatterUtils";
import {FormatRequest} from "@/types/formatter";


// set number of exporter rows
export const doSetNumberOfExportRows = (rows: Number): any =>
    async dispatch => {
        dispatch({type: SET_NUMBER_OF_EXPORT_ROWS, payload: rows});
    };

// change export format
export const doChangeExportFormat = (type: ExportFormat): any =>
    async dispatch => {
        const formatter = getFormatterByFormat(type);
        const defaultConfig = formatter.defaultConfig;
        dispatch({type: SET_EXPORT_FORMAT, payload: {type, defaultConfig}});
    };

// update formatter config
export const doUpdateFormatterConfig = (config: any): any =>
    async dispatch => {
        dispatch({type: SET_FORMATTER_CONFIG, payload: config});
    }

// set formatter config
export const doSetFormatterConfig = (formatRequest: FormatRequest, config: any): any =>
    async dispatch => {
        // CAUTION: A temporary solution that will be reconstructed shortly！
        const newData = formatData(formatRequest);
        dispatch({type: SET_FORMATTER_CONFIG, payload: config});
        dispatch({type: SET_PREVIEW_FORMATTED_DATA, payload: newData});
    };
