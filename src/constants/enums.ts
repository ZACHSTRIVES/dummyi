
// export format
export enum ExportFormatCategory {
    FILE_TYPES = "fileTypes",
    DATABASES = "databases",
    PROGRAMMING_LANGUAGES = "programmingLanguages",
}

export enum ExportFormat {
    SQL = "SQL",
    CSV = "CSV",
    JSON = "JSON",
    JAVA_SCRIPT = "Javascript",
    XML = "XML",
}

export enum ValueType {
    STRING = "string",
    TEXT= "text",
    ONE_BIT = "1bit",
    INT = "integer",
    BIGINT = "bigint",
    DOUBLE = "double",
    BOOLEAN = "boolean",
    INT_LIST = "int_list",
    STRING_LIST = "string_list"
}

export enum ExportProcessStage{
    PREVIEW = "preview",
    GENERATING = "generating",
    COMPLETED = "completed",
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
    URL = "url",
    DOMAINSUFFIX = "domainsuffix",
    DOMAINNAME = "domainname",
    ACCOUNTNUMBER = "accountnumber",
    ACCOUNTNAME = "accountname",
    COLOR = "color",
    PHONE = "phone",
    EMOJI = "emoji",
    PERSONTITLE = "persontitle",
    MIDDLENAME = "middlename",
    LASTNAME = "lastname",
    FIRSTNAME = "firstname",
    SEX = "sex",
    NUMBER = "number",
    EMAIL = "email",
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


