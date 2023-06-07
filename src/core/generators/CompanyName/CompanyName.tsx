import {GenerateResult} from "@/types/generator";
import {faker} from "@faker-js/faker";
import {ExportValueType} from "@/constants/enums";

// -------------------------------------------------------------------------------------------------------------
// types

// no types for now


// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const value= faker.company.name();
    return {
        value: value,
        stringValue: value,
        type: ExportValueType.STRING
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component

// no options component for now