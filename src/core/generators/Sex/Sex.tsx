import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {faker} from "@faker-js/faker";

// -------------------------------------------------------------------------------------------------------------
// types
export interface SexGeneratorOptions {

}

// -------------------------------------------------------------------------------------------------------------
// default options
export const SexGeneratorDefaultOptions:SexGeneratorOptions = {
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    const value = faker.person.sex();
   
    return {
        value: value,
        stringValue: value,
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const SexGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    return null;
}