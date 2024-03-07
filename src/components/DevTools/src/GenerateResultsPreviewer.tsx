import {DataFieldList} from "@/types/generator";
import {ColorMode, ExportFormat} from "@/constants/enums";
import React from "react";
import {FormatRequest} from "@/types/formatter";
import {
    formatData,
    getCodemirrorLanguagePluginByFormat,
    getFormatterDefaultConfigByFormat
} from "@/utils/formatterUtils";
import CodeMirror from "@uiw/react-codemirror";
import {darkTheme, lightTheme} from "@/components/PreviewPanel/src/components/RawPreviewer/RawPreviewer.themes";
import {EditorView} from "@codemirror/view";
import {Card, Tag, Typography} from "@douyinfe/semi-ui";
import {useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {Extension} from "@codemirror/state";

export interface GenerateResultsPreviewerProps {
    values: any[];
    fields: DataFieldList;
    sortedFieldIds: string[];
    formatType: ExportFormat;
}

export const GenerateResultsPreviewer: React.FunctionComponent<GenerateResultsPreviewerProps> = ({...props}) => {
    const {values, fields, sortedFieldIds, formatType} = props;
    const {Text} = Typography;
    // store
    const colorMode = useSelector(selectColorMode);

    // state
    const [previewData, setPreviewData] = React.useState("");
    const [codeMirrorExtensions, setCodeMirrorExtensions] = React.useState<any[]>([]);

    React.useEffect(() => {
        getPreviewData(values, fields, sortedFieldIds, formatType);
    }, [values, fields, sortedFieldIds, formatType]);

    React.useEffect(() => {
        const extensions: Extension[] = [];
        extensions.push(getCodemirrorLanguagePluginByFormat(formatType));
        extensions.push(EditorView.lineWrapping);
        setCodeMirrorExtensions(extensions);
    }, [formatType]);

    // actions
    const getPreviewData = (values: any[], fields: DataFieldList, sortedFieldIds: string[], formatType: ExportFormat) => {
        try {
            const formatRequest: FormatRequest = {
                values: values,
                fields: fields,
                sortedFieldIds: sortedFieldIds,
                format: formatType,
                config: getFormatterDefaultConfigByFormat(formatType)
            }
            const data = formatData(formatRequest);
            setPreviewData(data);

        } catch (err) {
            setPreviewData(err.toString())
        }
    }

    return (
        <div>
            <Card style={{width: "400px",height:"250px"}}>
                <Tag size={'small'}  type={colorMode === ColorMode.DARK ? 'solid' : 'ghost'}>{formatType}</Tag>
                <CodeMirror
                    editable={false}
                    readOnly={true}
                    theme={colorMode === ColorMode.DARK ? darkTheme : lightTheme}
                    value={previewData}
                    extensions={codeMirrorExtensions}
                    height={"210px"}
                    basicSetup={{
                        lineNumbers: true,
                        foldGutter: false,
                        history: false,
                        highlightActiveLine: false,
                        highlightActiveLineGutter: false,
                    }}
                    style={{
                        fontSize: 11,
                    }}
                />
            </Card>
        </div>
    )
}