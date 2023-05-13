import React, {useEffect} from "react";
import CodeMirror from "@uiw/react-codemirror";
import {langs} from '@uiw/codemirror-extensions-langs';
import {lightTheme} from "./RawPreviewer.themes";
import { EditorView } from '@codemirror/view';
import Styles from './RawPreviewer.module.css';

export type RawPreviewerProps = {
    height?: number;
}


export const RawPreviewer: React.FunctionComponent<RawPreviewerProps> = ({...props}) => {
    const {height} = props;

    return (
        <CodeMirror
            editable={false}
            readOnly={true}
            theme={lightTheme}
            basicSetup={{
                foldGutter: false,
                history:false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
            }}
            height={`${height}px`}
            value={sqlStatements}
            style={{fontSize:10,padding: "0 16px"}}
            extensions={[langs.sql(),EditorView.lineWrapping]}/>
    )
}


const sqlStatements = `DROP TABLE IF EXISTS \`myTable\`;
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
UPDATE \`myTable\` SET \`phone\` = "(726) 655-1163", \`phone1\` = "", \`email\` = "phasellus@aol.net" WHERE \`id\` = 10;`;
