import * as fs from 'fs';
import * as readline from 'readline';
import {DataTypeCategory} from "@/constants/enums";
import {enumUtils} from "./utils/enumUtils";
import {addLinesToLocal} from "./utils/localValuesUtils";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const categories = Object.values(DataTypeCategory).filter((category) => category !== DataTypeCategory.ALL);

const createGenerator = (generatorName: string) => {
    rl.question('➡️ Please select the category for the generator（enter the corresponding digit）：\n' +
        categories.map((option, index) => `${index + 1}. ${option}`).join('\n') +
        '\n', (answer) => {

        const selectedIndex = parseInt(answer) - 1;
        if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= categories.length) {
            console.log('❌Invalid option, please try again.');
            createGenerator(generatorName);
            return;
        } else {
            const path = `./src/core/generators/${generatorName}`;

            // add DataType enum option
            enumUtils('./src/constants/enums.ts', 'DataType', generatorName.toUpperCase(), generatorName.toLowerCase());

            // create directory
            fs.mkdirSync(path, {recursive: true});

            // create index.ts
            fs.writeFileSync(`${path}/index.ts`, writeGeneratorIndexFile(generatorName, categories[selectedIndex]), 'utf8');

            // create GENERATOR_NAME.tsx
            const fileName = `${generatorName}.tsx`;
            fs.writeFileSync(`${path}/${fileName}`, writeGeneratorTsxFile(generatorName), 'utf8');

            // add generator
            addGeneratorToIndex(generatorName);

            // add generator name to locale
            addLinesToLocal(/\/\/\s+data\s+types\s*/,
                [`// ${generatorName.toLowerCase()}`,
                `"dataType.${generatorName.toLowerCase()}": "${generatorName}",`]
                );

            console.log(`✨ Successfully created generator ${generatorName}!\n See ${path} for details.`);
            rl.close();
        }
    });
}

rl.question('💥 Please enter the name of the new generator：', (generatorName: string) => {
    const folderPath = `./src/core/generators`;
    generatorName = formatFolderName(generatorName);
    if (checkIfGeneratorExists(generatorName)) {
        rl.close();
        return;
    }
    createGenerator(generatorName);
});

// utils
const checkIfGeneratorExists = (generatorName: string): boolean => {
    const targetPath = `./src/core/generators/${generatorName}`;
    if (fs.existsSync(targetPath)) {
        console.log('❌ The generator already exists, please try again.');
        return true;
    }
    return false;
};

const formatFolderName = (folderName: string): string => {
    const firstLetter = folderName.charAt(0).toUpperCase();
    const restLetters = folderName.slice(1);
    return `${firstLetter}${restLetters}`;
};

const addGeneratorToIndex = (generatorName: string) => {
    const generatorsIndexFilePath = './src/core/generators/index.ts';
    const fileContent = fs.readFileSync(generatorsIndexFilePath, 'utf8');
    const contentAfterImport = `${`import {${generatorName}Generator} from "@/core/generators/${generatorName}";`}\n${fileContent}`;
    const generatorLine = `  [DataType.${generatorName.toUpperCase()}]: ${generatorName}Generator,`;
    const updatedContent = contentAfterImport.replace(/export\s+const\s+generators\s*=\s*{/, `export const generators = {\n${generatorLine}`);
    fs.writeFileSync(generatorsIndexFilePath, updatedContent, 'utf8');

}

const writeGeneratorTsxFile = (generatorName: string) => {
    return `import React from "react";
import {GenerateResult, GeneratorOptionsComponentInterface} from "@/types/generator";
import {ExportValueType} from "@/constants/enums";

// -------------------------------------------------------------------------------------------------------------
// types
export interface ${generatorName}GeneratorOptions {
 // TODO: add your own options type here   
}

// -------------------------------------------------------------------------------------------------------------
// default options
export const ${generatorName}GeneratorDefaultOptions:${generatorName}GeneratorOptions = {
    // TODO: add your own default options here
}

// -------------------------------------------------------------------------------------------------------------
// generate method
export const generate = (options: any): GenerateResult => {
    // TODO: implement your own generate method here
   
    return {
        value: 'NOT IMPLEMENTED',
        stringValue: 'NOT IMPLEMENTED',
        type: ExportValueType.STRING
    };
}

// -------------------------------------------------------------------------------------------------------------
// options component
export const ${generatorName}GeneratorOptionsComponent: React.FunctionComponent<GeneratorOptionsComponentInterface> = ({...props}) => {
    const {options, onOptionsChange} = props;
    
    const handleOptionsChange = (changedFieldName: string, value: any) => {
        let newOptions = {...options, [changedFieldName]: value};
        onOptionsChange(newOptions);
    };
    
    // TODO: implement your own options component here
    return (
        <div>
            NOT IMPLEMENTED
        </div>
    );
}`;
}

const writeGeneratorIndexFile = (generatorName: string, category: string) => {
    return `import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {${generatorName}GeneratorDefaultOptions, ${generatorName}GeneratorOptionsComponent, generate} from "./${generatorName}";

export const ${generatorName}Generator: Generator = {
    type: DataType.${generatorName.toUpperCase()},
    category: DataTypeCategory.${category.toUpperCase()},
    generate: generate,
    optionsComponent: ${generatorName}GeneratorOptionsComponent,
    defaultOptions: ${generatorName}GeneratorDefaultOptions,
    exampleLines: ["NOT IMPLEMENTED", "NOT IMPLEMENTED", "NOT IMPLEMENTED"]
}
    `;

}