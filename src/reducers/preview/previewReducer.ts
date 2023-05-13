import {PreviewReducerState} from "@/types/system";
import {PreviewType} from "@/constants/enums";
import {
    SET_RAW_VIEW_LINE_WRAP,
    SET_RAW_VIEW_SHOW_LINE_NUMBERS
} from "@/constants/actions";


export const initState: PreviewReducerState = {
    previewType: PreviewType.RAW,
    rawViewShowLineNumber: true,
    rawViewLineWrap: true,
    rawViewFontSize: 13,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: PreviewReducerState = initState, action: any) => {
    switch (action.type) {
        case SET_RAW_VIEW_SHOW_LINE_NUMBERS:
            return {
                ...state,
                rawViewShowLineNumber: action.payload
            };
        case SET_RAW_VIEW_LINE_WRAP:
            return {
                ...state,
                rawViewLineWrap: action.payload
            }
        default:
            return state;
    }
}