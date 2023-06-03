import {
    ADD_NEW_DATA_FIELD, CHANGE_DATA_TYPE,
    CLOSE_DATA_TYPE_OPTIONS_MODAL,
    CLOSE_DATA_TYPE_SELECT_MODAL,
    DELETE_DATA_FIELD, GENERATE_PREVIEW_DATA, GENERATE_SPECIFIC_FIELD_PREVIEW_DATA,
    OPEN_DATA_TYPE_OPTIONS_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL,
    SET_PANELS_DIRECTION, SORT_DATA_FIELDS,
    UPDATE_DATA_FIELD
} from "@/constants/actions";
import {DataType, PanelsOrientation} from "@/constants/enums";
import {DataField} from "@/types/generator";
import {UUID} from "uuidjs";
import {getGeneratorDefaultOptionsByDataType} from "@/utils/generatorUtils";


// set panels direction
export const doSetPanelsOrientation = (direction: PanelsOrientation): any =>
    async dispatch => {
        dispatch({type: SET_PANELS_DIRECTION, payload: direction});
    };

// open data type select modal
export const doOpenDataTypeSelectModal = (fieldId: string): any =>
    async dispatch => {
        dispatch({type: OPEN_DATA_TYPE_SELECT_MODAL, payload: fieldId});
    };

// close data type select modal
export const doCloseDataTypeSelectModal = (): any =>
    async dispatch => {
        dispatch({type: CLOSE_DATA_TYPE_SELECT_MODAL});
    };

// open data type options modal
export const doOpenDataTypeOptionsModal = (fieldId: string): any =>
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
        dispatch(doGenerateSpecificFieldPreviewData(id));
    };

// sort data fields
export const doSortDataFields = (sortableIdsList: string[]): any =>
    async dispatch => {
        dispatch({type: SORT_DATA_FIELDS, payload: sortableIdsList});
    };

// change data type
export const doChangeDataType = (id: string, dataType: DataType): any =>
    async dispatch => {
        const defaultOptions = getGeneratorDefaultOptionsByDataType(dataType);
        dispatch({type: CHANGE_DATA_TYPE, payload: {id: id, dataType: dataType, options: defaultOptions}});
        dispatch(doGenerateSpecificFieldPreviewData(id));
    };

// generate preview data
export const doGeneratePreviewData = (): any =>
    async dispatch => {
        dispatch({type: GENERATE_PREVIEW_DATA});
    };

// generate specific field data
export const doGenerateSpecificFieldPreviewData = (id: string): any =>
    async dispatch => {
        dispatch({type: GENERATE_SPECIFIC_FIELD_PREVIEW_DATA, payload: id});
    };


