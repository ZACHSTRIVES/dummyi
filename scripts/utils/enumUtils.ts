import fs from "fs";

export const enumUtils = (enumFilePath: string, enumName: string, optionName: string, optionValue: string) => {
    const enumFileContent = fs.readFileSync(enumFilePath, 'utf8');
    const enumRegex = new RegExp(`enum\\s+${enumName}\\s*{`);
    const enumMatch = enumRegex.exec(enumFileContent);

    if (enumMatch) {
        const insertPosition = enumMatch.index + enumMatch[0].length;
        const indentation = '  ';
        const optionLine = `${indentation}  ${optionName} = "${optionValue}",`;
        const updatedEnumContent = `${enumFileContent.slice(0, insertPosition)}\n${optionLine}${enumFileContent.slice(insertPosition)}`;
        fs.writeFileSync(enumFilePath, updatedEnumContent, 'utf8');
    }
}
