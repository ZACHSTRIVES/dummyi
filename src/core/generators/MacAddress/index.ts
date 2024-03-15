import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {MacAddressGeneratorDefaultOptions, MacAddressGeneratorOptionsComponent, generate} from "./MacAddress";

export const MacAddressGenerator: Generator = {
    type: DataType.MACADDRESS,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    optionsComponent: MacAddressGeneratorOptionsComponent,
    defaultOptions: MacAddressGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["NOT IMPLEMENTED", "NOT IMPLEMENTED", "NOT IMPLEMENTED"]
}
    