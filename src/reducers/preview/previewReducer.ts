import {PreviewReducerState} from "@/types/system";
import {PreviewType} from "@/constants/enums";
import {
    SET_PREVIEW_TYPE,
    SET_RAW_VIEW_FONT_SIZE,
    SET_RAW_VIEW_LINE_WRAP,
    SET_RAW_VIEW_SHOW_LINE_NUMBERS
} from "@/constants/actions";

const exampleTableContent=[
    {
        "email": "diam.luctus@google.couk",
        "phone1": "",
        "phone": "Mar 23, 2023",
        "email1": "mus@google.com",
        "company": "Tortor Integer Aliquam LLC"
    },
    {
        "email": "vivamus@hotmail.net",
        "phone1": "",
        "phone": "Mar 13, 2024",
        "email1": "mus.aenean.eget@yahoo.net",
        "company": "Eu Arcu Incorporated"
    },
    {
        "email": "et.pede@protonmail.net",
        "phone1": "",
        "phone": "Sep 13, 2023",
        "email1": "tellus@outlook.net",
        "company": "In Tempus Company"
    },
    {
        "email": "a.malesuada.id@protonmail.org",
        "phone1": "",
        "phone": "Sep 3, 2023",
        "email1": "ligula.eu@outlook.edu",
        "company": "Dui Fusce Industries"
    },
    {
        "email": "cursus.diam@yahoo.org",
        "phone1": "",
        "phone": "Sep 23, 2023",
        "email1": "fermentum@yahoo.couk",
        "company": "Euismod Est Arcu Associates"
    },
    {
        "email": "eget.ipsum@hotmail.net",
        "phone1": "",
        "phone": "Apr 21, 2024",
        "email1": "donec.consectetuer@outlook.edu",
        "company": "Sem Consequat Associates"
    },
    {
        "email": "rutrum.lorem@aol.couk",
        "phone1": "",
        "phone": "Nov 17, 2023",
        "email1": "ac.orci@outlook.com",
        "company": "Arcu Curabitur Ut Ltd"
    },
    {
        "email": "sagittis@icloud.couk",
        "phone1": "",
        "phone": "Feb 28, 2024",
        "email1": "tincidunt@icloud.couk",
        "company": "Scelerisque Lorem Corp."
    },
    {
        "email": "augue.malesuada@hotmail.ca",
        "phone1": "",
        "phone": "Oct 16, 2023",
        "email1": "quam.vel@yahoo.com",
        "company": "Tristique Aliquet Phasellus Limited"
    },
    {
        "email": "ut@icloud.edu",
        "phone1": "",
        "phone": "Dec 14, 2022",
        "email1": "mi.ac.mattis@yahoo.couk",
        "company": "Sed Eu LLP"
    },
    {
        "email": "neque.morbi@yahoo.org",
        "phone1": "",
        "phone": "Jul 5, 2022",
        "email1": "ac.feugiat@outlook.net",
        "company": "Sit Amet Dapibus Foundation"
    },
    {
        "email": "lorem.tristique@icloud.ca",
        "phone1": "",
        "phone": "Jun 5, 2022",
        "email1": "eu.arcu@aol.ca",
        "company": "Id Nunc Interdum Associates"
    },
    {
        "email": "donec.egestas@aol.com",
        "phone1": "",
        "phone": "Aug 5, 2022",
        "email1": "pede.nunc@protonmail.couk",
        "company": "Tristique PC"
    },
    {
        "email": "ipsum@yahoo.com",
        "phone1": "",
        "phone": "Aug 20, 2023",
        "email1": "proin.vel@aol.ca",
        "company": "Nec Quam Inc."
    },
    {
        "email": "aliquam.erat.volutpat@yahoo.net",
        "phone1": "",
        "phone": "Apr 26, 2023",
        "email1": "lectus@outlook.com",
        "company": "At Limited"
    },
    {
        "email": "odio.sagittis@aol.couk",
        "phone1": "",
        "phone": "May 14, 2024",
        "email1": "arcu@hotmail.com",
        "company": "Ut Corp."
    },
    {
        "email": "amet.massa.quisque@google.net",
        "phone1": "",
        "phone": "Aug 5, 2022",
        "email1": "commodo.ipsum@icloud.ca",
        "company": "Urna Et PC"
    },
    {
        "email": "sed.libero@icloud.com",
        "phone1": "",
        "phone": "Feb 14, 2023",
        "email1": "molestie.tellus@aol.org",
        "company": "A Arcu Consulting"
    },
    {
        "email": "lectus@yahoo.org",
        "phone1": "",
        "phone": "Oct 28, 2023",
        "email1": "massa.rutrum.magna@aol.org",
        "company": "Nunc Id Inc."
    },
    {
        "email": "eu@hotmail.com",
        "phone1": "",
        "phone": "Jan 25, 2023",
        "email1": "eget.lacus@protonmail.edu",
        "company": "Velit Sed Ltd"
    }
];

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
    tableViewContent: exampleTableContent,
    rawViewShowLineNumber: true,
    rawViewLineWrap: true,
    rawViewFontSize: 13,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: PreviewReducerState = initState, action: any) => {
    switch (action.type) {
        case SET_PREVIEW_TYPE:
            return {
                ...state,
                previewType: action.payload
            }
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


