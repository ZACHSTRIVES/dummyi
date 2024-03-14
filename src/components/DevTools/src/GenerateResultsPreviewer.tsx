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
import {Card, Space, Tag} from "@douyinfe/semi-ui";
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

    // store
    const colorMode = useSelector(selectColorMode);

    // state
    const [previewData, setPreviewData] = React.useState("");
    const [isError, setIsError] = React.useState(false);
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
            let config = getFormatterDefaultConfigByFormat(formatType);

            if (formatType === ExportFormat.SQL) {
                config.createTable = true;
                config.primaryKey = false;
            }

            if (formatType === ExportFormat.CSHARP) {
                config.dtoClass = true;
            }

            const formatRequest: FormatRequest = {
                values: values,
                fields: fields,
                sortedFieldIds: sortedFieldIds,
                format: formatType,
                config: getFormatterDefaultConfigByFormat(formatType)
            }
            const data = formatData(formatRequest);
            setIsError(false);
            setPreviewData(data);

        } catch (err) {
            setPreviewData(err.toString())
            setIsError(true);
        }
    }

    return (
        <div>
            <Card style={{width: "400px", height: "250px", borderColor: isError ? "red" : null}}>
                <Space>
                    <Tag size={'small'} type={colorMode === ColorMode.DARK ? 'solid' : 'ghost'}>{formatType}</Tag>
                    {isError && <Tag size={'small'} style={{color: 'red'}}>ERROR</Tag>}
                </Space>
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