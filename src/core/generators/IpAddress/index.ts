import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory, ValueType} from "@/constants/enums";
import {IpAddressGeneratorDefaultOptions, IpAddressGeneratorOptionsComponent, generate} from "./IpAddress";

export const IpAddressGenerator: Generator = {
    type: DataType.IPADDRESS,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    optionsComponent: IpAddressGeneratorOptionsComponent,
    defaultOptions: IpAddressGeneratorDefaultOptions,
    defaultValueType: ValueType.STRING,
    exampleLines: ["245.108.222.0", "64.239.253.171", "246.18.59.18"]
}
    