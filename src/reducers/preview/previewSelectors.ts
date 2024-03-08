import {RootState} from "@/types/system";

export const selectPreviewType = (state: RootState) => state.preview.previewType;
export const selectRawViewShowLineNumber = (state: RootState) => state.preview.rawViewShowLineNumber;
export const selectRawViewLineWrap = (state: RootState) => state.preview.rawViewLineWrap;
export const selectRawViewFontSize = (state: RootState) => state.preview.rawViewFontSize;