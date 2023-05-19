import React from "react";
import {ExportType, ExportTypeCategory} from "@/constants/enums";

export type Formatter ={
    type: ExportType;
    category: ExportTypeCategory;
    format: (data: any) => any;
    configComponent?: React.FunctionComponent<FormatterConfigComponentInterface>;
    defaultConfig?: any;
}

export interface FormatterConfigComponentInterface{
    onConfigChange: (config: any) => void;
    config: any;
}

