import {SET_EXPORT_FILE_NAME, SET_SHOW_EXPORT_MODAL} from "@/constants/actions";

// set show export modal
export const doSetShowExportModal = (show: boolean): any =>
    async dispatch => {
        dispatch({type: SET_SHOW_EXPORT_MODAL, payload: show});
    };

// set export file name
export const doSetExportFileName = (fileName: string): any =>
    async dispatch => {
        dispatch({type: SET_EXPORT_FILE_NAME, payload: fileName});
    };