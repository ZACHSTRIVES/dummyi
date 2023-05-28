import {
    ADD_NEW_DATA_FIELD,
    CLOSE_DATA_TYPE_OPTIONS_MODAL,
    CLOSE_DATA_TYPE_SELECT_MODAL, DELETE_DATA_FIELD, OPEN_DATA_TYPE_OPTIONS_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL,
    SET_DATA_FIELDS,
    SET_PANELS_DIRECTION, UPDATE_DATA_FIELD
} from "@/constants/actions";
import {PanelsOrientation} from "@/constants/enums";
import {DataField} from "@/types/generator";
import {UUID} from "uuidjs";


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
export const doOpenDataTypeSelectModal = (fieldId:string): any =>
    async dispatch => {
        dispatch({type: OPEN_DATA_TYPE_SELECT_MODAL, payload: fieldId});
    };

// close data type select modal
export const doCloseDataTypeSelectModal = (): any =>
    async dispatch => {
        dispatch({type: CLOSE_DATA_TYPE_SELECT_MODAL});
    };

// open data type options modal
export const doOpenDataTypeOptionsModal = (fieldId:string): any =>
    async dispatch => {
        dispatch({type: OPEN_DATA_TYPE_OPTIONS_MODAL, payload: fieldId});
    };

// close data type options modal
export const doCloseDataTypeOptionsModal = (): any =>
    async dispatch => {
        dispatch({type: CLOSE_DATA_TYPE_OPTIONS_MODAL});
    };

// add data field
export const doAddNewDataField = (): any =>
    async dispatch => {
        const field: DataField = {
            isDraft: true,
            emptyRate: 0,
        }
        const id = UUID.generate();
        dispatch({type: ADD_NEW_DATA_FIELD, payload: {id: id, field: field}});
    };

// delete data field
export const doDeleteDataField = (id: string): any =>
    async dispatch => {
        dispatch({type: DELETE_DATA_FIELD, payload: id});
    };

// update data field
export const doUpdateDataField = (id: string, field: DataField): any =>
    async dispatch => {
        field.isDraft = !(field.dataType && field.fieldName);
        dispatch({type: UPDATE_DATA_FIELD, payload: {id: id, field: field}});
    };



