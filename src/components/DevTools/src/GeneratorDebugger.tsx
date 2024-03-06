import {DataField} from "@/types/generator";
import React from "react";
import {IconTerminal} from "@douyinfe/semi-icons";
import {Button, Card, Descriptions, Modal, Tag, Typography} from "@douyinfe/semi-ui";
import CodeMirror from "@uiw/react-codemirror";
import {EditorView} from "@codemirror/view";
import {langs} from '@uiw/codemirror-extensions-langs';
import {darkTheme, lightTheme} from "@/components/PreviewPanel/src/components/RawPreviewer/RawPreviewer.themes";
import {useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {ColorMode} from "@/constants/enums";

export interface GeneratorDebuggerProps {
    id: string;
    dataField: DataField;
    renderDataTypeOptions: any
}

export const GeneratorDebugger: React.FunctionComponent<GeneratorDebuggerProps> = ({...props}) => {
    const {id, dataField, renderDataTypeOptions} = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {Text} = Typography;

    // store
    const colorMode = useSelector(selectColorMode);

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                style={{color: '#c7c4c4'}}
                theme="borderless"
                icon={<IconTerminal/>}
            />

            <Modal size={'large'} height={'80%'} title={`Debugger: ${dataField.fieldName ? dataField.fieldName : "Unnamed"}`}
                   visible={isModalOpen}
                   onCancel={handleClose} footer={null}>
                <div>
                    <Descriptions align={'left'} style={{marginBottom: 10}}>
                        <Descriptions.Item itemKey="UUID"><Text copyable>{id}</Text></Descriptions.Item>
                        <Descriptions.Item itemKey="Field Name">{dataField.fieldName}</Descriptions.Item>
                        <Descriptions.Item itemKey="Draft">
                            <Tag type={colorMode === ColorMode.DARK ? 'solid' : 'ghost'}>
                                {dataField.isDraft ? "true" : "false"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item itemKey="Generator">
                            <Tag type={colorMode === ColorMode.DARK ? 'solid' : 'ghost'}>
                                {dataField.dataType ? dataField.dataType : "null"}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item itemKey="Value Type">
                            <Tag type={colorMode === ColorMode.DARK ? 'solid' : 'ghost'}>{dataField.valueType}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item itemKey="Empty Rate">
                            {dataField.emptyRate}%
                        </Descriptions.Item>
                        <Descriptions.Item itemKey="Options Component">
                            <Card style={{width: "700px"}}>
                                {renderDataTypeOptions()}
                            </Card>
                        </Descriptions.Item>
                        <Descriptions.Item itemKey="Generator Options">
                            <Card style={{width: "700px"}}>
                                <CodeMirror
                                    editable={false}
                                    readOnly={true}
                                    theme={colorMode === ColorMode.DARK ? darkTheme : lightTheme}
                                    value={JSON.stringify(dataField.dataTypeOptions)}
                                    extensions={[EditorView.lineWrapping, langs.json()]}
                                    basicSetup={{
                                        lineNumbers: true,
                                        foldGutter: false,
                                        history: false,
                                        highlightActiveLine: false,
                                        highlightActiveLineGutter: false,
                                    }}
                                />
                            </Card>
                            <Button size={'small'} style={{marginTop: 6}}>Reset</Button>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        </>
    )
}