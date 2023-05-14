import {SET_RAW_VIEW_FONT_SIZE, SET_RAW_VIEW_LINE_WRAP, SET_RAW_VIEW_SHOW_LINE_NUMBERS} from "@/constants/actions";
import {PanelsOrientation} from "@/constants/enums";


// set rawPreview show line numbers
export const doSetRawViewShowLineNumbers = (show: boolean): any =>
    async dispatch => {
        dispatch({type: SET_RAW_VIEW_SHOW_LINE_NUMBERS, payload: show});
    };

// set warp line
export const doSetRawViewLineWrap = (wrap: boolean): any =>
    async dispatch => {
        dispatch({type: SET_RAW_VIEW_LINE_WRAP, payload: wrap});
    };

// set font size
export const doSetRawViewFontSize = (size: number): any =>
    async dispatch => {
        dispatch({type: SET_RAW_VIEW_FONT_SIZE, payload: size});
    };