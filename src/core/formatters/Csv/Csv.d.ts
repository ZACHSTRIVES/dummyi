import {EndOfLineChars} from "@/constants/enums";

export type CsvFormatterConfig = {
    delimiter: string;
    includeHeader: boolean;
    endOfLineChar: EndOfLineChars;
}

