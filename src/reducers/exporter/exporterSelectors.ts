import {Store} from "@/types/system";

export const selectExportFormat = (state: Store) => state.exporter.exportFormat;
export const selectNumberOfExportRows = (state: Store) => state.exporter.numberOfExportRows;
export const selectFormatterConfig = (state: Store) => state.exporter.formatterConfig;
