
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

export enum ExportValueType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    DATE_TIME = "dateTime",
    NULL = "null"
}

// data types
export enum DataTypeCategory {
    ALL= "all",
    BASIC = "basic",
    PERSON = "person",
    NETWORK = "network",
    COMMERCE = "commerce",
}

export enum DataType {
    NUMBER = "number",
    EMAIL = "email",
    // DATE_TIME = "dateTime",
    // ACCOUNT_NUMBER = "accountNumber",
    BOOLEAN = "boolean",
    FULL_NAME = "fullName",
    COMPANY_NAME = "companyName",
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

export enum CollectionNodeType{
    COLLECTION = "collection",
    SCHEMA = "schema"
}

export enum EndOfLineChars {
    LF = '\n',
    CRLF = '\r\n'
}

export enum Sex{
    ALL = "all",
    MALE = "male",
    FEMALE = "female"
}


