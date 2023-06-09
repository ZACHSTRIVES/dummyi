import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import {langs} from '@uiw/codemirror-extensions-langs';
import {EditorView} from '@codemirror/view';
import {useSelector} from "react-redux";
import {RootState} from "@/types/system";
import {ColorMode} from "@/constants/enums";
import {darkTheme, lightTheme} from "@/components/PreviewPanel/src/components/RawPreviewer/RawPreviewer.themes";
import {Extension} from "@codemirror/state";
import {
    selectDataFieldsSortableIdsList, selectExportFormat,
    selectPreviewFormattedData
} from "@/reducers/workspace/workspaceSelectors";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {getCodemirrorLanguagePluginByFormat} from "@/utils/formatterUtils";


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
    } = useSelector((state: RootState) => state.preview);

    const previewFormattedData = useSelector(selectPreviewFormattedData);
    const sortableIdsList = useSelector(selectDataFieldsSortableIdsList);
    const format = useSelector(selectExportFormat);

    React.useEffect(() => {
        const extensions: Extension[] = [];

        extensions.push(getCodemirrorLanguagePluginByFormat(format));

        if (rawViewLineWrap) {
            extensions.push(EditorView.lineWrapping);
        }

        setCodeMirrorExtensions(extensions);
    }, [rawViewLineWrap, format]);

    return (
        <>
        {sortableIdsList.length !== 0 ?  <CodeMirror
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
                extensions={codeMirrorExtensions}/>:<></>
        }
        </>
    )
};