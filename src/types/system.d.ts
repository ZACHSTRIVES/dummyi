import {ColorMode} from "@/constents/enums";

export interface Action  {
    type: string;
    payload?: any;
}

export interface Store  {
    settings: SettingsReducerState;
}

export interface SettingsReducerState  {
    colorMode: ColorMode;
}