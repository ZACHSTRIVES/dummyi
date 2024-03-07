import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import { generate} from "./DomainName";

export const DomainNameGenerator: Generator = {
    type: DataType.DOMAINNAME,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    exampleLines: ["google.com", "wikipedia.org", "museum.info","aucklanduni.ac.nz","tech.startup.io"]
}
    