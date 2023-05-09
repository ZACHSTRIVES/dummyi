import {Action, SettingsReducerState} from "@/types/system";
import {ColorMode} from "@/constents/enums";
import {SET_COLOR_MODE} from "@/constents/actions";

export const initStates: SettingsReducerState = {
    colorMode: ColorMode.LIGHT
}

export default (state: SettingsReducerState = initStates, action: Action) => {
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


