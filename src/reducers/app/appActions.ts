import {SET_COLOR_MODE, SET_LOCALE} from "@/constants/actions";
import {ColorMode,Locales} from "@/constants/enums";



// change color mode
export const doSetColorMode = (colorMode: ColorMode): any =>
    async dispatch => {
        dispatch({type: SET_COLOR_MODE, payload: colorMode});
    };

// change locale
export const doChangeLocale = (locale: Locales): any =>
    async dispatch => {
        dispatch({type: SET_LOCALE, payload: locale});
    };