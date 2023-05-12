import {Action, WorkplaceReducerState} from "@/types/system";
import {SET_PANELS_DIRECTION} from "@/constents/actions";
import {DEFAULT_PANELS_DIRECTION} from "@/constents/core";

export const initStates:WorkplaceReducerState = {
    panelsDirection: DEFAULT_PANELS_DIRECTION,
}

export default (state: WorkplaceReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_PANELS_DIRECTION:
            return {
                ...state,
                panelsDirection: action.payload,
            }
        default:
            return state;
    }
}


