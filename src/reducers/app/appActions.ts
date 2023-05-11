import {SET_COLOR_MODE} from "@/constents/actions";
import {ColorMode} from "@/constents/enums";


// change color mode
export const doSetColorMode = (colorMode: ColorMode): any =>
    async dispatch => {
        dispatch({type: SET_COLOR_MODE, payload: colorMode});
    }