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
    exampleLines: ["00:1A:2B:3C:4D:5E", "00-1A-2B-3C-4D-5E", "001A2B3C4D5E"]
}
    