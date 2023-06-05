import React from 'react';
import {GenerateRequest, GeneratorOptionsComponentInterface} from "@/types/generator";

// -------------------------------------------------------------------------------------------------------------
// types

// -------------------------------------------------------------------------------------------------------------
// generate method

export const generate = (request: GenerateRequest): string => {
    return 'Hello World';
}

// -------------------------------------------------------------------------------------------------------------
// options component

export const DatetimeGeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {

    return (
        <div>
            DatetimeConfigPanel
        </div>
    )
};
