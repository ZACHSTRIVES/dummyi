import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {langs} from '@uiw/codemirror-extensions-langs';
import {EditorView} from '@codemirror/view';
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {ColorMode} from "@/constants/enums";
import {darkTheme, lightTheme} from "@/components/PreviewPanel/src/components/RawPreviewer/RawPreviewer.themes";
import {Extension} from "@codemirror/state";
import {selectPreviewData, selectPreviewFormattedData} from "@/reducers/workspace/workspaceSelectors";
import {selectColorMode} from "@/reducers/app/appSelectors";


export type RawPreviewerProps = {
    height?: number;
}


export const RawPreviewer: React.FunctionComponent<RawPreviewerProps> = ({...props}) => {
    const {height} = props;
    const [codeMirrorExtensions, setCodeMirrorExtensions] = React.useState<any[]>([]);

    // store
    const colorMode = useSelector(selectColorMode);
    const {
        rawViewShowLineNumber,
        rawViewLineWrap,
        rawViewFontSize
    } = useSelector((state: Store) => state.preview);

    const previewFormattedData = useSelector(selectPreviewFormattedData);

    React.useEffect(() => {
        const extensions: Extension[] = [langs.xml()];

        if (rawViewLineWrap) {
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
            value={previewFormattedData}
            style={{
                fontSize: rawViewFontSize,
            }}
            extensions={codeMirrorExtensions}/>
    )
};