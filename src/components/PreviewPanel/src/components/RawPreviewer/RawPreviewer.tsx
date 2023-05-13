import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {langs} from '@uiw/codemirror-extensions-langs';
import {EditorView} from '@codemirror/view';
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {ColorMode} from "@/constants/enums";
import {darkTheme, lightTheme} from "@/components/PreviewPanel/src/components/RawPreviewer/RawPreviewer.themes";
import {Extension} from "@codemirror/state";


export type RawPreviewerProps = {
    height?: number;
}


export const RawPreviewer: React.FunctionComponent<RawPreviewerProps> = ({...props}) => {
    const {height} = props;
    const [codeMirrorExtensions, setCodeMirrorExtensions] = React.useState<any[]>([]);

    // store
    const colorMode = useSelector((state: Store) => state.app.colorMode);
    const {rawViewShowLineNumber, rawViewLineWrap, rawViewFontSize} = useSelector((state: Store) => state.preview);

    React.useEffect(() => {
        const extensions:Extension[] = [
            langs.sql()];

        if(rawViewLineWrap) {
            extensions.push(EditorView.lineWrapping);
        }

        setCodeMirrorExtensions(extensions);
    }, [rawViewLineWrap]);

    return (
        <CodeMirror
            editable={false}
            readOnly={true}
            theme={colorMode === ColorMode.DARK ? darkTheme : lightTheme}
            basicSetup={{
                lineNumbers: rawViewShowLineNumber,
                foldGutter: false,
                history: false,
                highlightActiveLine: false,
                highlightActiveLineGutter: false,
            }}
            height={`${height}px`}
            value={sqlStatements}
            style={{
                fontSize: rawViewFontSize,
            }}
            extensions={codeMirrorExtensions}/>
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
