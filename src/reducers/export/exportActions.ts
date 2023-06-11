import {SET_SHOW_EXPORT_MODAL} from "@/constants/actions";

// set show export modal
export const doSetShowExportModal = (show: boolean): any =>
    async dispatch => {
        dispatch({type: SET_SHOW_EXPORT_MODAL, payload: show});
    };