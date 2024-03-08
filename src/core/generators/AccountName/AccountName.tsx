import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types
export interface AccountNameGeneratorOptions {
   // TODO: add your own option types here   
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const AccountNameGeneratorDefaultOptions:AccountNameGeneratorOptions = {
    // TODO: add your own default options here
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {

    const value = faker.finance.accountName();
   
    return {
        value: value,
        stringValue: value
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const AccountNameGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    return null;
}