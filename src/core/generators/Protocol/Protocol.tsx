import {GenerateResult} from "@/types/generator";
import {faker} from "@faker-js/faker";
// -------------------------------------------------------------------------------------------------------------
// types

// no types for now

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
   const value = faker.internet.protocol();
    return {
        value: value,
        stringValue: value,
    };
}

// -------------------------------------------------------------------------------------------------------------
// no options component
