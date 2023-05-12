import {SET_PANELS_DIRECTION} from "@/constents/actions";
import {PanelsDirection} from "@/constents/enums";


// set panels direction
export const doSetPanelsDirection = (direction: PanelsDirection): any =>
    async dispatch => {
        dispatch({type: SET_PANELS_DIRECTION, payload: direction});
    }