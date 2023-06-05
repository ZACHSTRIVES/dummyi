import {Store} from "@/types/system";

export const selectPreviewType = (state: Store) => state.preview.previewType;
export const selectRawViewShowLineNumber = (state: Store) => state.preview.rawViewShowLineNumber;
export const selectRawViewLineWrap = (state: Store) => state.preview.rawViewLineWrap;
export const selectRawViewFontSize = (state: Store) => state.preview.rawViewFontSize;