import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import { generate} from "./Protocol";

export const ProtocolGenerator: Generator = {
    type: DataType.PROTOCOL,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    defaultValueType: ValueType.STRING,
    exampleLines: ["http", "https", "https"]
}
    