import {ColorMode, ExportFormat, ExportProcessStage, Locales, PanelsOrientation, PreviewType} from "@/constants/enums";
import enTranslations from "@/locales/en.json";
import type {IntlFormatters} from 'react-intl';
import {DataField, DataFieldList} from "@/types/generator";

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

export interface RootState {
    app: AppReducerState;
    workspace: WorkspaceReducerState;
    preview: PreviewReducerState;
    export: ExportReducerState;
}

export interface AppReducerState {
    locale: Locales;
    colorMode: ColorMode;
}

export interface WorkspaceReducerState {
    dataFields: DataFieldList;
    dataFieldsSortableIdsList: string[];
    exportFormat: ExportFormat;
    numberOfExportRows: number;
    formatterConfig: any;
    previewData: any;
    previewFormattedData: string;
    panelsOrientation: PanelsOrientation;
    showDataTypeSelectModal: boolean;
    currentDataTypeSelectModalTargetField?: DataField;
    currentDataTypeSelectModalTargetFieldId?: string;
    showDataTypeOptionsModal: boolean;
    currentDataTypeOptionsModalTargetField?: DataField;
    currentDataTypeOptionsModalTargetFieldId?: string;
}

export interface PreviewReducerState {
    previewType: PreviewType;
    rawViewShowLineNumber: boolean;
    rawViewLineWrap: boolean;
    rawViewFontSize: number;
}

export interface  ExportReducerState {
    showExportModal: boolean;
    exportFileName: string;
    exportProcessStage: ExportProcessStage;
}

// locales
export type IntlMessageKeys = keyof typeof enTranslations;
export type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;

// types
export type JsonObject = {
    [key: string]: any;
}
