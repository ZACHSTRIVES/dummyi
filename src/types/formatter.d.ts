import React from "react";
import {ExportType, ExportTypeCategory} from "@/constants/enums";

export type Formatter ={
    type: ExportType;
    category: ExportTypeCategory;
    format: (data: any) => any;
    configComponent?: React.FunctionComponent;
}

export type FormattersGroupedByCategory = {
    [key in ExportTypeCategory]: Formatter[];
}