import fs from "fs";
import * as path from 'path';

const TRANSLATION_FILE_PATH = 'src/locale/translations';

export const addLinesToLocal = (targetLine: RegExp, lines: string[]) => {

    fs.readdirSync(TRANSLATION_FILE_PATH).forEach((file) => {
        const filePath = path.join(TRANSLATION_FILE_PATH, file);
        if (fs.statSync(filePath).isFile()) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const updatedContent = fileContent.replace(targetLine, (match) => {
                const indent = '    ';
                const addedLines = lines.map((line) => `${indent}${line}`).join('\n');
                return `${match}\n${addedLines}\n\n${indent}`;
            });
            fs.writeFileSync(filePath, updatedContent, 'utf8');
        }
    });
};