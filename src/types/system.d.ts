import {ColorMode, ExportFormat, PanelsOrientation, PreviewType} from "@/constants/enums";
import enTranslations from "@/locales/en.json";
import type {IntlFormatters} from 'react-intl';
import {DataField} from "@/types/generator";

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
    exportFormat: ExportFormat;
    numberOfExportRows: number;
    formatterConfig: any;
}

export interface WorkspaceReducerState {
    dataFields: DataField[];
    panelsOrientation: PanelsOrientation;
    showDataTypeSelectModal: boolean;
    currentDataTypeSelectModalTargetField?: DataField;
}

export interface PreviewReducerState {
    previewType: PreviewType;
    rawViewShowLineNumber: boolean;
    rawViewLineWrap: boolean;
    rawViewFontSize: number;
    previewData: any;
    previewFormattedData: string;
}

// locales
export type IntlMessageKeys = keyof typeof enTranslations;
export type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;

// types
export type JsonObject = {
    [key: string]: any;
}
