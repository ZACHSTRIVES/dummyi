import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types

// no types for now
// -------------------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const value = faker.internet.domainName();
    
    return {
        value: value,
        stringValue: value,
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
