import {SET_PANELS_DIRECTION} from "@/constents/actions";
import {PanelsOrientation} from "@/constents/enums";


// set panels direction
export const doSetPanelsOrientation= (direction: PanelsOrientation): any =>
    async dispatch => {
        dispatch({type: SET_PANELS_DIRECTION, payload: direction});
    }