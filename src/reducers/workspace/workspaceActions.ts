import {SET_DATA_FIELDS, SET_PANELS_DIRECTION} from "@/constants/actions";
import {PanelsOrientation} from "@/constants/enums";


// set panels direction
export const doSetPanelsOrientation = (direction: PanelsOrientation): any =>
    async dispatch => {
        dispatch({type: SET_PANELS_DIRECTION, payload: direction});
    };

// update data fields
export const doUpdateDataFields = (dataFields: any[]): any =>
    async dispatch => {
        dispatch({type: SET_DATA_FIELDS, payload: dataFields});
    };
