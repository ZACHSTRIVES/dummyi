import {ColorMode, PanelsOrientation} from "@/constants/enums";
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

// locales
export type IntlMessageKeys = keyof typeof enTranslations;
export type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;