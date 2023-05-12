import {Action, AppReducerState} from "@/types/system";
import {ColorMode} from "@/constents/enums";
import {SET_COLOR_MODE} from "@/constents/actions";

export const initStates: AppReducerState = {
    colorMode: ColorMode.LIGHT
}

export default (state: AppReducerState = initStates, action: Action) => {
    switch (action.type) {
        case SET_COLOR_MODE:
            return {
                ...state,
                colorMode: action.payload,
            }
        default:
            return state;
    }
}


