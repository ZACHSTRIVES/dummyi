import {Action, WorkspaceReducerState} from "@/types/system";
import {
    CLOSE_DATA_TYPE_SELECT_MODAL,
    OPEN_DATA_TYPE_SELECT_MODAL,
    SET_DATA_FIELDS,
    SET_PANELS_DIRECTION
} from "@/constants/actions";
import {DEFAULT_PANELS_ORIENTATION} from "@/constants/core";
import {mockFields} from "@/reducers/mock";

export const initStates: WorkspaceReducerState = {
    dataFields: mockFields,
    panelsOrientation: DEFAULT_PANELS_ORIENTATION,
    showDataTypeSelectModal: false,
    currentDataTypeSelectModalTargetField: null,
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
                currentDataTypeSelectModalTargetField: action.payload,
            };
        case CLOSE_DATA_TYPE_SELECT_MODAL:
            return {
                ...state,
                showDataTypeSelectModal: false,
            };
        default:
            return state;
    }
}


