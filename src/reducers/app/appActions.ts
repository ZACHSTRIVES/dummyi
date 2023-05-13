import {SET_COLOR_MODE} from "@/constants/actions";
import {ColorMode} from "@/constants/enums";


// change color mode
export const doSetColorMode = (colorMode: ColorMode): any =>
    async dispatch => {
        dispatch({type: SET_COLOR_MODE, payload: colorMode});
    }