import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {generate} from "./DomainSuffix";

export const DomainSuffixGenerator: Generator = {
    type: DataType.DOMAINSUFFIX,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    defaultValueType: ValueType.STRING,
    exampleLines: [".com", ".edu", ".nz"]
}
    