import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {ExportValueType} from "@/constants/enums";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types


// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    // TODO: implement your own generate method here
   const value = faker.internet.domainSuffix();
    return {
        value: value,
        stringValue: value,
        type: ExportValueType.STRING
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
