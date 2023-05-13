import {PreviewReducerState} from "@/types/system";
import {PreviewType} from "@/constants/enums";


export const initState: PreviewReducerState = {
    previewType: PreviewType.RAW,
    rawViewShowLineNumber: true,
    rawViewLineWrap: true,
    rawViewFontSize: 13,
}

export default (state: PreviewReducerState = initState, action: any) => {
    switch (action.type) {
        default:
            return state;
    }

}