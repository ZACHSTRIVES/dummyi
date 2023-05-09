import {ColorMode} from "@/constents/enums";
import enTranslations from "@/locales/en.json";
import type {IntlFormatters} from 'react-intl';

// routes
export interface RouteType {
    id: string;
    path: string;
}


// states
export interface Action {
    type: string;
    payload?: any;
}

export interface Store {
    settings: SettingsReducerState;
}

export interface SettingsReducerState {
    colorMode: ColorMode;
}

// locales
export type IntlMessageKeys = keyof typeof enTranslations;
export type FormatMessageArgs = Parameters<IntlFormatters['formatMessage']>;