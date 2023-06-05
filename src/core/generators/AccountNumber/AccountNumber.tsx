import React from 'react';
import {GenerateRequest, GeneratorOptionsComponentInterface} from "@/types/generator";
import {NumberGeneratorOptionsComponent} from "@/core/generators/Number/Number";

// -------------------------------------------------------------------------------------------------------------
// types

// -------------------------------------------------------------------------------------------------------------
// generate method

export const generate = (request: GenerateRequest): string => {
    return 'Hello World';
}

// -------------------------------------------------------------------------------------------------------------
// options component

export const AccountNumberGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {

    return (
        <div>
            AccountNumberConfigPanel
        </div>
    )
};
