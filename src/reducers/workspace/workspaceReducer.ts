import {Action, WorkspaceReducerState} from "@/types/system";
import {SET_PANELS_DIRECTION} from "@/constents/actions";
import {DEFAULT_PANELS_ORIENTATION} from "@/constents/core";
import {PanelsOrientation} from "@/constents/enums";

export const initStates:WorkspaceReducerState = {
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


