
// format data
export enum ExportFormatCategory {
    FILE_TYPES = "fileTypes",
    PROGRAMMING_LANGUAGES = "programmingLanguages",
}

export enum ExportFormat {
    CSV = "CSV",
    JSON = "JSON",
    JAVA_SCRIPT = "Javascript",
    XML = "XML",
}

// data types
export enum DataTypeCategory {
    ALL= "all",
    BASIC = "basic",
    PERSON = "person",
    COMMERCE = "commerce",
}

export enum DataType {
    NUMBER = "number",
    PERSON_NAME = "personName",
    DATE_TIME = "dateTime",
    ACCOUNT_NUMBER = "accountNumber",
    BOOLEAN = "boolean"
}

// systems
export enum ColorMode {
    DARK = "dark",
    LIGHT = "light",
}

export enum PanelsOrientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

export enum Locales {
    EN = "en",
    ZH_CN = "zh-CN",
    JA_JP = "ja-JP",
}

export enum ComponentSize{
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}

export enum PreviewType{
    TABLE = "table",
    RAW = "raw"
}

export enum EndOfLineChars {
    LF = '\n',
    CRLF = '\r\n'
}


