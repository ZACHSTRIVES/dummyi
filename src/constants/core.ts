import {ColorMode, Locales, PanelsOrientation, PreviewType} from "@/constants/enums";

// app
export const DEFAULT_LOCALE = Locales.EN;
export const DEFAULT_COLOR_MODE = ColorMode.DARK;

// exporter
export const DEFAULT_NUMBER_EXPORT_ROWS = 100;
export const MAX_NUMBER_EXPORT_ROWS = 1000;
export const MIN_NUMBER_EXPORT_ROWS = 1;

// workspace
export const DEFAULT_PANELS_ORIENTATION = PanelsOrientation.HORIZONTAL;

// preview
export const DEFAULT_PREVIEW_TYPE = PreviewType.RAW;
export const DEFAULT_FONT_SIZE = 12;
export const DEFAULT_SHOW_ROW_NUMBERS = true;
export const DEFAULT_LINE_WRAP = false;