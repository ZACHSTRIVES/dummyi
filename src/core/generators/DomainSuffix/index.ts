import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {generate} from "./DomainSuffix";

export const DomainSuffixGenerator: Generator = {
    type: DataType.DOMAINSUFFIX,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    exampleLines: [".com", ".edu", ".nz",".app"]
}
    