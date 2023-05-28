import {Action, WorkspaceReducerState} from "@/types/system";
import {
    ADD_NEW_DATA_FIELD,
    CLOSE_DATA_TYPE_OPTIONS_MODAL,
    CLOSE_DATA_TYPE_SELECT_MODAL,
    DELETE_DATA_FIELD,
    OPEN_DATA_TYPE_OPTIONS_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL,
    SET_DATA_FIELDS,
    SET_PANELS_DIRECTION, UPDATE_DATA_FIELD
} from "@/constants/actions";
import {DEFAULT_PANELS_ORIENTATION} from "@/constants/core";
import {mockFields} from "@/reducers/mock";

export const initStates: WorkspaceReducerState = {
    dataFields: mockFields,
    panelsOrientation: DEFAULT_PANELS_ORIENTATION,
    showDataTypeSelectModal: false,
    currentDataTypeSelectModalTargetFieldId: null,
    showDataTypeOptionsModal: false,
    currentDataTypeOptionsModalTargetFieldId: null,
}

export default (state: WorkspaceReducerState = initStates, action: Action) => {
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
            }
        case ADD_NEW_DATA_FIELD:
            return {
                ...state,
                dataFields: {
                    ...state.dataFields,
                    [action.payload.id]: action.payload.field
                }
            }
        case DELETE_DATA_FIELD:
            let newDateFields = {};
            for (const key in state.dataFields) {
                if (key !== action.payload) {
                    newDateFields[key] = state.dataFields[key];
                }
            }
            return {
                ...state,
                dataFields: newDateFields,
            }
        case UPDATE_DATA_FIELD:
            return {
                ...state,
                dataFields: {
                    ...state.dataFields,
                    [action.payload.id]: action.payload.field
                }
            }

        default:
            return state;
    }
}


