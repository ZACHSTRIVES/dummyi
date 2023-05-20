import {PreviewReducerState} from "@/types/system";
import {
    SET_PREVIEW_TYPE,
    SET_RAW_VIEW_FONT_SIZE,
    SET_RAW_VIEW_LINE_WRAP,
    SET_RAW_VIEW_SHOW_LINE_NUMBERS
} from "@/constants/actions";
import {mockData} from "@/reducers/mock";
import {
    DEFAULT_LINE_WRAP,
    DEFAULT_SHOW_ROW_NUMBERS,
    DEFAULT_FONT_SIZE,
    DEFAULT_PREVIEW_TYPE
} from "@/constants/core";

export const initState: PreviewReducerState = {
    previewType: DEFAULT_PREVIEW_TYPE,
    previewData: mockData,
    previewFormattedData: '',
    rawViewShowLineNumber: DEFAULT_SHOW_ROW_NUMBERS,
    rawViewLineWrap: DEFAULT_LINE_WRAP,
    rawViewFontSize: DEFAULT_FONT_SIZE,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: PreviewReducerState = initState, action: any) => {
    switch (action.type) {
        case SET_PREVIEW_TYPE:
            return {
                ...state,
                previewType: action.payload
            }
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
        case SET_RAW_VIEW_FONT_SIZE:
            return {
                ...state,
                rawViewFontSize: action.payload
            }
        default:
            return state;
    }
}


