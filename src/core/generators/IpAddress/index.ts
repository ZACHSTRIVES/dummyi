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
    exampleLines: ["245.108.222.0", "64.239.253.171", "e106:aa3c:59ac:6d0f:4c2c:bfef:86a3:62d7"]
}
    