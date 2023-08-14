import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {ExportValueType} from "@/constants/enums";
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
        type: ExportValueType.STRING
    }
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const SexGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    // TODO: implement your own options component here
    return null;
}