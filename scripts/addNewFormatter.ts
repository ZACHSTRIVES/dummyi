import * as fs from 'fs';
import * as readline from 'readline';
import {ExportFormatCategory} from "@/constants/enums";
import {enumUtils} from "./utils/enumUtils";
import {addLinesToLocal} from "./utils/localValuesUtils";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const categories = Object.values(ExportFormatCategory);

const createFormatter = (formatterName: string, fileExtension: string) => {
    rl.question('➡️ Please select the category for the formatter（enter the corresponding digit）：\n' +
        categories.map((option, index) => `${index + 1}. ${option}`).join('\n') +
        '\n', (answer) => {

        const selectedIndex = parseInt(answer) - 1;
        if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= categories.length) {
            console.log('❌Invalid option, please try again.');
            createFormatter(formatterName, fileExtension);
            return;
        } else {
            const path = `./src/core/formatters/${formatterName}`;

            // add formatter enum option
            enumUtils('./src/constants/enums.ts', 'ExportFormat', formatterName.toUpperCase(), formatterName);

            // create directory
            fs.mkdirSync(path, {recursive: true});

            // create index.ts
            fs.writeFileSync(`${path}/index.ts`, writeFormatterIndexFile(formatterName, categories[selectedIndex], fileExtension), 'utf8');

            // create FORMATTER_NAME.tsx
            const fileName = `${formatterName}.tsx`;
            fs.writeFileSync(`${path}/${fileName}`, writeFormatterTsxFile(formatterName), 'utf8');

            // add formatter
            addFormatterToIndex(formatterName);

            console.log(`✨ Successfully created formatter ${formatterName}!\n See ${path} for details.`);
            rl.close();
        }
    });
}

rl.question('💥 Please enter the name of the new formatter: ', (formatterName: string) => {
    const folderPath = `./src/core/generators`;
    formatterName = formatFolderName(formatterName);
    if (checkIfFormatExists(formatterName)) {
        rl.close();
        return;
    }

    rl.question('➡️ Please enter the file extension for the formatter: ', (fileExtension: string) => {
        createFormatter(formatterName , fileExtension);
    });
});

// utils
const checkIfFormatExists = (formatterName: string): boolean => {
    const targetPath = `./src/core/formatters/${formatterName}`;
    if (fs.existsSync(targetPath)) {
        console.log('❌ The formatter already exists, please try again.');
        return true;
    }
    return false;
};

const formatFolderName = (folderName: string): string => {
    const firstLetter = folderName.charAt(0).toUpperCase();
    const restLetters = folderName.slice(1);
    return `${firstLetter}${restLetters}`;
};

const addFormatterToIndex = (formatterName: string) => {
    const formattersIndexFilePath = './src/core/formatters/index.ts';
    const fileContent = fs.readFileSync(formattersIndexFilePath, 'utf8');
    const contentAfterImport = `${`import {${formatterName}Formatter} from "@/core/formatters/${formatterName}";`}\n${fileContent}`;
    const formatterLine = `  [ExportFormat.${formatterName.toUpperCase()}]: ${formatterName}Formatter,`;
    const updatedContent = contentAfterImport.replace(/export\s+const\s+formatters\s*=\s*{/, `export const formatters = {\n${formatterLine}`);
    fs.writeFileSync(formattersIndexFilePath, updatedContent, 'utf8');
}

const writeFormatterTsxFile = (formatterName: string) => {
    return `import React from "react";
import {FormatRequest, FormatterConfigComponentInterface} from "@/types/formatter";

// -------------------------------------------------------------------------------------------------------------
// types

export type ${formatterName}FormatterConfig = {
     // TODO: add your own config types here   
}

// -------------------------------------------------------------------------------------------------------------
// default options

export const default${formatterName}FormatterConfig: ${formatterName}FormatterConfig = {
    
    // TODO: add your own default configs here
}

// -------------------------------------------------------------------------------------------------------------
// format method

export const format = (request: FormatRequest): string => {
    
    const { fields, values, sortedFieldIds, config } = request;
    
    // TODO: implement your own format method here
    
    return "NOT IMPLEMENTED"
}

// -------------------------------------------------------------------------------------------------------------
// config component

export const ${formatterName}ConfigComponent: React.FC<FormatterConfigComponentInterface> = ({...props}) => {
    const {config, onConfigChange} = props;

    // action
    const handleValueChange = (field: string, value: any) => {
        onConfigChange({...config, [field]: value})
    }

   // TODO: implement your own configs component here
    return (
        <div>
            NOT IMPLEMENTED
        </div>
    );
}
`;
}

const writeFormatterIndexFile = (formatterName: string, category: string, fileExtension: string) => {
    return `import {Formatter} from "@/types/formatter";
import {ExportFormat, ExportFormatCategory} from "@/constants/enums";
import {${formatterName}ConfigComponent, format, default${formatterName}FormatterConfig} from "./${formatterName}";


export const ${formatterName}Formatter: Formatter = {
    type: ExportFormat.${formatterName.toUpperCase()},
    category: ExportFormatCategory.${category.toUpperCase()},
    format: format,
    fileExtension: '${fileExtension}',
    configComponent: ${formatterName}ConfigComponent,
    defaultConfig: default${formatterName}FormatterConfig,
}`;

}