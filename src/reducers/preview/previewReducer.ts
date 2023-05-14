import {PreviewReducerState} from "@/types/system";
import {PreviewType} from "@/constants/enums";
import {
    SET_RAW_VIEW_FONT_SIZE,
    SET_RAW_VIEW_LINE_WRAP,
    SET_RAW_VIEW_SHOW_LINE_NUMBERS
} from "@/constants/actions";

const exampleRawContent = `DROP TABLE IF EXISTS \`myTable\`;
CREATE TABLE \`myTable\` (
  \`id\` mediumint(8) unsigned NOT NULL auto_increment,
  \`phone\` varchar(100) default NULL,
  \`phone1\` varchar(100) default NULL,
  \`email\` varchar(255) default NULL,
  PRIMARY KEY (\`id\`)
) AUTO_INCREMENT=1;

UPDATE \`myTable\` SET \`phone\` = "(726) 178-1190", \`phone1\` = "", \`email\` = "tortor@outlook.net" WHERE \`id\` = 1;
UPDATE \`myTable\` SET \`phone\` = "1-139-744-8235", \`phone1\` = "", \`email\` = "hendrerit.consectetuer@protonmail.net" WHERE \`id\` = 2;
UPDATE \`myTable\` SET \`phone\` = "(866) 917-2258", \`phone1\` = "", \`email\` = "elit@aol.com" WHERE \`id\` = 3;
UPDATE \`myTable\` SET \`phone\` = "1-731-230-7839", \`phone1\` = "", \`email\` = "arcu.eu@icloud.couk" WHERE \`id\` = 4;
UPDATE \`myTable\` SET \`phone\` = "(516) 339-3732", \`phone1\` = "", \`email\` = "non.arcu.vivamus@google.org" WHERE \`id\` = 5;
UPDATE \`myTable\` SET \`phone\` = "1-925-798-6863", \`phone1\` = "", \`email\` = "eu.tellus@yahoo.edu" WHERE \`id\` = 6;
UPDATE \`myTable\` SET \`phone\` = "(685) 724-5375", \`phone1\` = "", \`email\` = "etiam.bibendum@protonmail.com" WHERE \`id\` = 7;
UPDATE \`myTable\` SET \`phone\` = "1-733-142-9736", \`phone1\` = "", \`email\` = "augue@outlook.couk" WHERE \`id\` = 8;
UPDATE \`myTable\` SET \`phone\` = "1-732-861-1221", \`phone1\` = "", \`email\` = "lectus.quis@google.com" WHERE \`id\` = 9;
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;
UPDATE \`myTable\` SET \`phone\` = "1-733-142-9736", \`phone1\` = "", \`email\` = "augue@outlook.couk" WHERE \`id\` = 8;
UPDATE \`myTable\` SET \`phone\` = "1-732-861-1221", \`phone1\` = "", \`email\` = "lectus.quis@google.com" WHERE \`id\` = 9;
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;
UPDATE \`myTable\` SET \`phone\` = "1-733-142-9736", \`phone1\` = "", \`email\` = "augue@outlook.couk" WHERE \`id\` = 8;
UPDATE \`myTable\` SET \`phone\` = "1-732-861-1221", \`phone1\` = "", \`email\` = "lectus.quis@google.com" WHERE \`id\` = 9;
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;
UPDATE \`myTable\` SET \`phone\` = "(726) 178-1190", \`phone1\` = "", \`email\` = "tortor@outlook.net" WHERE \`id\` = 1;
UPDATE \`myTable\` SET \`phone\` = "1-139-744-8235", \`phone1\` = "", \`email\` = "hendrerit.consectetuer@protonmail.net" WHERE \`id\` = 2;
UPDATE \`myTable\` SET \`phone\` = "(866) 917-2258", \`phone1\` = "", \`email\` = "elit@aol.com" WHERE \`id\` = 3;
UPDATE \`myTable\` SET \`phone\` = "1-731-230-7839", \`phone1\` = "", \`email\` = "arcu.eu@icloud.couk" WHERE \`id\` = 4;
UPDATE \`myTable\` SET \`phone\` = "(516) 339-3732", \`phone1\` = "", \`email\` = "non.arcu.vivamus@google.org" WHERE \`id\` = 5;
UPDATE \`myTable\` SET \`phone\` = "1-925-798-6863", \`phone1\` = "", \`email\` = "eu.tellus@yahoo.edu" WHERE \`id\` = 6;
UPDATE \`myTable\` SET \`phone\` = "(685) 724-5375", \`phone1\` = "", \`email\` = "etiam.bibendum@protonmail.com" WHERE \`id\` = 7;
UPDATE \`myTable\` SET \`phone\` = "1-733-142-9736", \`phone1\` = "", \`email\` = "augue@outlook.couk" WHERE \`id\` = 8;
UPDATE \`myTable\` SET \`phone\` = "1-732-861-1221", \`phone1\` = "", \`email\` = "lectus.quis@google.com" WHERE \`id\` = 9;
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;
UPDATE \`myTable\` SET \`phone\` = "1-733-142-9736", \`phone1\` = "", \`email\` = "augue@outlook.couk" WHERE \`id\` = 8;
UPDATE \`myTable\` SET \`phone\` = "1-732-861-1221", \`phone1\` = "", \`email\` = "lectus.quis@google.com" WHERE \`id\` = 9;
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;
UPDATE \`myTable\` SET \`phone\` = "1-733-142-9736", \`phone1\` = "", \`email\` = "augue@outlook.couk" WHERE \`id\` = 8;
UPDATE \`myTable\` SET \`phone\` = "1-732-861-1221", \`phone1\` = "", \`email\` = "lectus.quis@google.com" WHERE \`id\` = 9;
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;
`;
export const initState: PreviewReducerState = {
    previewType: PreviewType.RAW,
    rawViewContent: exampleRawContent,
    rawViewShowLineNumber: true,
    rawViewLineWrap: true,
    rawViewFontSize: 13,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: PreviewReducerState = initState, action: any) => {
    switch (action.type) {
        case SET_RAW_VIEW_SHOW_LINE_NUMBERS:
            return {
                ...state,
                rawViewShowLineNumber: action.payload
            };
        case SET_RAW_VIEW_LINE_WRAP:
            return {
                ...state,
                rawViewLineWrap: action.payload
            }
        case SET_RAW_VIEW_FONT_SIZE:
            return {
                ...state,
                rawViewFontSize: action.payload
            }
        default:
            return state;
    }
}


