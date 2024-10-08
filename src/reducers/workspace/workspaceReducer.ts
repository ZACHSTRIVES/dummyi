import {Action, WorkspaceReducerState} from "@/types/system";
import {
    ADD_NEW_DATA_FIELD,
    CHANGE_DATA_TYPE,
    CLOSE_DATA_TYPE_OPTIONS_MODAL,
    CLOSE_DATA_TYPE_SELECT_MODAL,
    DELETE_DATA_FIELD,
    EMPTY_WORKSPACE,
    FORMAT_PREVIEW_DATA,
    GENERATE_PREVIEW_DATA,
    GENERATE_SPECIFIC_FIELD_PREVIEW_DATA,
    OPEN_DATA_TYPE_OPTIONS_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL,
    SET_DATA_FIELDS,
    SET_EXPORT_FORMAT,
    SET_FORMATTER_CONFIG,
    SET_NUMBER_OF_EXPORT_ROWS,
    SET_PANELS_DIRECTION,
    SORT_DATA_FIELDS,
    UPDATE_DATA_FIELD,
    UPDATE_DATA_FIELD_NAME
} from "@/constants/actions";
import {DEFAULT_NUMBER_EXPORT_ROWS, DEFAULT_PANELS_ORIENTATION} from "@/constants/config";
import {mockFields} from "@/reducers/mock";
import {deleteSpecificFieldData, generateData, generateSpecificFieldPreviewData} from "@/utils/generatorUtils";
import {ExportFormat} from "@/constants/enums";
import {CsvFormatter} from "@/core/formatters/Csv";
import {FormatRequest} from "@/types/formatter";
import {formatData} from "@/utils/formatterUtils";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {generateDefaultFieldName} from "@/utils/dataFieldUtils";


export const initStates: WorkspaceReducerState = {
    dataFields: mockFields,
    dataFieldsSortableIdsList: Object.keys(mockFields),
    previewData: [],
    previewFormattedData: '',
    exportFormat: ExportFormat.CSV,
    numberOfExportRows: DEFAULT_NUMBER_EXPORT_ROWS,
    formatterConfig: CsvFormatter.defaultConfig,
    panelsOrientation: DEFAULT_PANELS_ORIENTATION,
    showDataTypeSelectModal: false,
    currentDataTypeSelectModalTargetFieldId: null,
    showDataTypeOptionsModal: false,
    currentDataTypeOptionsModalTargetFieldId: null,
}

const workspaceReducer = (state: WorkspaceReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_PANELS_DIRECTION:
            return {
                ...state,
                panelsOrientation: action.payload,
            };
        case SET_DATA_FIELDS:
            return {
                ...state,
                dataFields: action.payload,
            };
        case OPEN_DATA_TYPE_SELECT_MODAL:
            return {
                ...state,
                showDataTypeSelectModal: true,
                currentDataTypeSelectModalTargetFieldId: action.payload,
            };
        case CLOSE_DATA_TYPE_SELECT_MODAL:
            return {
                ...state,
                showDataTypeSelectModal: false,
            };
        case OPEN_DATA_TYPE_OPTIONS_MODAL:
            return {
                ...state,
                showDataTypeOptionsModal: true,
                currentDataTypeOptionsModalTargetFieldId: action.payload,
            };
        case CLOSE_DATA_TYPE_OPTIONS_MODAL:
            return {
                ...state,
                showDataTypeOptionsModal: false,
            };
        case ADD_NEW_DATA_FIELD:
            return {
                ...state,
                dataFields: {
                    ...state.dataFields,
                    [action.payload.id]: action.payload.field
                },
                dataFieldsSortableIdsList: [...state.dataFieldsSortableIdsList, action.payload.id]
            };
        case DELETE_DATA_FIELD:
            let newDateFields = {};
            let newSortableIdsList = [];
            for (let i = 0; i < state.dataFieldsSortableIdsList.length; i++) {
                const id = state.dataFieldsSortableIdsList[i]
                if (id !== action.payload) {
                    newSortableIdsList.push(state.dataFieldsSortableIdsList[i]);
                    newDateFields[id] = state.dataFields[id];
                }
            }
            return {
                ...state,
                dataFields: newDateFields,
                dataFieldsSortableIdsList: newSortableIdsList,
                previewData: deleteSpecificFieldData(state.dataFields, state.dataFieldsSortableIdsList, state.previewData, action.payload)
            };
        case UPDATE_DATA_FIELD:
            return {
                ...state,
                dataFields: {
                    ...state.dataFields,
                    [action.payload.id]: action.payload.field
                }
            };
        case UPDATE_DATA_FIELD_NAME:
            const {id: fieldId, name} = action.payload;
            return {
                ...state,
                dataFields: {
                    ...state.dataFields,
                    [fieldId]: {
                        ...state.dataFields[fieldId],
                        fieldName: name
                    }
                }
            }
        case SORT_DATA_FIELDS:
            return {
                ...state,
                dataFieldsSortableIdsList: action.payload,
            };
        case CHANGE_DATA_TYPE:
            const {id, dataType, valueType, options} = action.payload;
            const field = {
                ...state.dataFields[id],
                isDraft: false,
                dataType,
                valueType,
                dataTypeOptions: options
            };

            if (isNullOrWhiteSpace(field.fieldName)) {
                field.fieldName = generateDefaultFieldName(dataType, state.dataFields, state.dataFieldsSortableIdsList)
            }

            return {
                ...state,
                dataFields: {
                    ...state.dataFields,
                    [id]: field
                }
            };
        case GENERATE_PREVIEW_DATA:
            return {
                ...state,
                previewData: generateData(state.dataFields, state.dataFieldsSortableIdsList, 80)
            };
        case GENERATE_SPECIFIC_FIELD_PREVIEW_DATA:
            return {
                ...state,
                previewData: generateSpecificFieldPreviewData(state.dataFields, state.dataFieldsSortableIdsList, state.previewData, action.payload)
            };
        case SET_NUMBER_OF_EXPORT_ROWS:
            return {
                ...state,
                numberOfExportRows: action.payload
            };
        case SET_EXPORT_FORMAT:
            return {
                ...state,
                exportFormat: action.payload.type,
                formatterConfig: action.payload.defaultConfig
            };
        case SET_FORMATTER_CONFIG:
            return {
                ...state,
                formatterConfig: action.payload
            };
        case FORMAT_PREVIEW_DATA:
            const request: FormatRequest = {
                fields: state.dataFields,
                sortedFieldIds: state.dataFieldsSortableIdsList,
                format: state.exportFormat,
                config: state.formatterConfig,
                values: state.previewData
            }
            return {
                ...state,
                previewFormattedData: formatData(request)
            }
        case EMPTY_WORKSPACE:
            return {
                ...state,
                dataFields: {},
                dataFieldsSortableIdsList: [],
                previewData: [],
                previewFormattedData: '',
            }
        default:
            return state;
    }
}

export default workspaceReducer;
