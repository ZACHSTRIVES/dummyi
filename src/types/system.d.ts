import {ColorMode, PanelsOrientation, PreviewType} from "@/constants/enums";
import enTranslations from "@/locales/en.json";
import type {IntlFormatters} from 'react-intl';

// routes
export interface RouteType {
    id: string;
    path: string;
    localeId: string;
}

// states
export interface Action {
    type: string;
    payload?: any;
}

export interface Store {
    app: AppReducerState;
    exporter: ExporterReducerState;
    workspace: WorkspaceReducerState;
    preview: PreviewReducerState;
}

export interface AppReducerState {
    colorMode: ColorMode;
}

export interface ExporterReducerState {
    numberOfExportRows: number;
}

export interface WorkspaceReducerState {
    panelsOrientation: PanelsOrientation;
}

export interface PreviewReducerState {
    previewType: PreviewType;
    rawViewShowLineNumber: boolean;
    rawViewLineWrap: boolean;
    rawViewFontSize: number;
}

// locales
export type IntlMessageKeys = keyof typeof enTranslations;
export type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;