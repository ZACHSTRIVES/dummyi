import {Action, WorkspaceReducerState} from "@/types/system";
import {SET_PANELS_DIRECTION} from "@/constants/actions";
import {DEFAULT_PANELS_ORIENTATION} from "@/constants/core";
import {mockFields} from "@/reducers/mock";

export const initStates: WorkspaceReducerState = {
    dataFields: mockFields,
    panelsOrientation: DEFAULT_PANELS_ORIENTATION,
}

export default (state: WorkspaceReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_PANELS_DIRECTION:
            return {
                ...state,
                panelsOrientation: action.payload,
            }
        default:
            return state;
    }
}


