export enum NumberGeneratorKind {
    BIGINT = "BIGINT",
    BINARY = "BINARY",
    FLOAT = "FLOAT",
    HEX = "HEX",
    INTEGER = "INT",
    OCTAL = "OCTAL",
}

export interface NumberGeneratorOptions {
    kind: NumberGeneratorKind;
    precision: number;
    min: number;
    max: number;
}