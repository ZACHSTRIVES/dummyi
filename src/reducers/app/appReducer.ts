import {Action, AppReducerState} from "@/types/system";
import {SET_COLOR_MODE} from "@/constants/actions";
import {DEFAULT_COLOR_MODE} from "@/constants/core";

export const initStates: AppReducerState = {
    colorMode: DEFAULT_COLOR_MODE
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: AppReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_COLOR_MODE:
            return {
                ...state,
                colorMode: action.payload,
            };
        default:
            return state;
    }
}


