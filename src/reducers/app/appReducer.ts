import {Action, AppReducerState} from "@/types/system";
import {SET_COLOR_MODE, SET_LOCALE} from "@/constants/actions";
import {DEFAULT_COLOR_MODE, DEFAULT_LOCALE} from "@/constants/core";

export const initStates: AppReducerState = {
    locale:DEFAULT_LOCALE,
    colorMode: DEFAULT_COLOR_MODE
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: AppReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_LOCALE:
            return {
                ...state,
                locale: action.payload,
            };
        case SET_COLOR_MODE:
            return {
                ...state,
                colorMode: action.payload,
            };
        default:
            return state;
    }
}


