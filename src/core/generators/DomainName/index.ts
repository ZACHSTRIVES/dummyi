import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {generate} from "./DomainName";

export const DomainNameGenerator: Generator = {
    type: DataType.DOMAINNAME,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    defaultValueType: ValueType.STRING,
    exampleLines: ["google.com", "wikipedia.org", "museum.info"]
}
    