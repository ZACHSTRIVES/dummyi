import {
    CLOSE_DATA_TYPE_SELECT_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL,
    SET_DATA_FIELDS,
    SET_PANELS_DIRECTION
} from "@/constants/actions";
import {PanelsOrientation} from "@/constants/enums";
import {DataField} from "@/types/generator";


// set panels direction
export const doSetPanelsOrientation = (direction: PanelsOrientation): any =>
    async dispatch => {
        dispatch({type: SET_PANELS_DIRECTION, payload: direction});
    };

// update data fields
export const doUpdateDataFields = (dataFields: DataField[]): any =>
    async dispatch => {
        dispatch({type: SET_DATA_FIELDS, payload: dataFields});
    };

// open data type select modal
export const doOpenDataTypeSelectModal = (field: DataField): any =>
    async dispatch => {
        dispatch({type: OPEN_DATA_TYPE_SELECT_MODAL, payload: field});
    };

// close data type select modal
export const doCloseDataTypeSelectModal = (): any =>
    async dispatch => {
        dispatch({type: CLOSE_DATA_TYPE_SELECT_MODAL});
    };

