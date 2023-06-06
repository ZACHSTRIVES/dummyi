import {
    ADD_NEW_DATA_FIELD, CHANGE_DATA_TYPE,
    CLOSE_DATA_TYPE_OPTIONS_MODAL,
    CLOSE_DATA_TYPE_SELECT_MODAL,
    DELETE_DATA_FIELD, FORMAT_PREVIEW_DATA, GENERATE_PREVIEW_DATA, GENERATE_SPECIFIC_FIELD_PREVIEW_DATA,
    OPEN_DATA_TYPE_OPTIONS_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL, SET_EXPORT_FORMAT, SET_FORMATTER_CONFIG, SET_NUMBER_OF_EXPORT_ROWS,
    SET_PANELS_DIRECTION, SORT_DATA_FIELDS,
    UPDATE_DATA_FIELD, UPDATE_DATA_FIELD_NAME
} from "@/constants/actions";
import {DataType, ExportFormat, PanelsOrientation} from "@/constants/enums";
import {DataField} from "@/types/generator";
import {UUID} from "uuidjs";
import {getGeneratorDefaultOptionsByDataType} from "@/utils/generatorUtils";
import {getFormatterByFormat} from "@/utils/formatterUtils";


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
        field.isDraft = !(field.dataType);
        dispatch({type: UPDATE_DATA_FIELD, payload: {id: id, field: field}});
        dispatch(doGenerateSpecificFieldPreviewData(id));
    };

// update daya field name
export const doUpdateDataFieldName = (id: string, name: string): any =>
    async dispatch => {
        dispatch({type: UPDATE_DATA_FIELD_NAME, payload: {id: id, name: name}});
        dispatch(doFormatData());
    }

// sort data fields
export const doSortDataFields = (sortableIdsList: string[]): any =>
    async dispatch => {
        dispatch({type: SORT_DATA_FIELDS, payload: sortableIdsList});
        dispatch(doFormatData());
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
        dispatch(doFormatData());
    };

// generate specific field data
export const doGenerateSpecificFieldPreviewData = (id: string): any =>
    async dispatch => {
        dispatch({type: GENERATE_SPECIFIC_FIELD_PREVIEW_DATA, payload: id});
        dispatch(doFormatData());
    };

// set number of exporter rows
export const doSetNumberOfExportRows = (rows: Number): any =>
    async dispatch => {
        dispatch({type: SET_NUMBER_OF_EXPORT_ROWS, payload: rows});
    };

// change export format
export const doChangeExportFormat = (type: ExportFormat): any =>
    async dispatch => {
        const formatter = getFormatterByFormat(type);
        const defaultConfig = formatter.defaultConfig;
        dispatch({type: SET_EXPORT_FORMAT, payload: {type, defaultConfig}});
        dispatch(doFormatData());
    };

// update formatter config
export const doUpdateFormatterConfig = (config: any): any =>
    async dispatch => {
        dispatch({type: SET_FORMATTER_CONFIG, payload: config});
        dispatch(doFormatData());
    }

// format data
export const doFormatData = (): any =>
    async dispatch => {
        dispatch({type: FORMAT_PREVIEW_DATA});
    }

