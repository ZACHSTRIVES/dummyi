import {DataField, DataFieldList} from "@/types/generator";
import React from "react";
import {IconTerminal} from "@douyinfe/semi-icons";
import {Button, Card, Descriptions, Modal, Space, Tag, Typography} from "@douyinfe/semi-ui";
import CodeMirror from "@uiw/react-codemirror";
import {EditorView} from "@codemirror/view";
import {langs} from '@uiw/codemirror-extensions-langs';
import {darkTheme, lightTheme} from "@/components/PreviewPanel/src/components/RawPreviewer/RawPreviewer.themes";
import {useDispatch, useSelector} from "react-redux";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {ColorMode, ExportFormat} from "@/constants/enums";
import {doUpdateDataField} from "@/reducers/workspace/workspaceActions";
import {
    generateData,
    getGeneratorDefaultOptionsByDataType,
    getGeneratorDefaultValueTypeByDataType
} from "@/utils/generatorUtils";
import {GenerateResultsPreviewer} from "@/components/DevTools/src/GenerateResultsPreviewer";
import {formatters} from "@/core/formatters";

export interface GeneratorDebuggerProps {
    id: string;
    dataField: DataField;
    renderDataTypeOptions: any
}

export const GeneratorDebugger: React.FunctionComponent<GeneratorDebuggerProps> = ({...props}) => {
    const {id, dataField, renderDataTypeOptions} = props;
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {Text} = Typography;
    const dispatch = useDispatch();

    // mock data
    const dataFieldList: DataFieldList = {[id]: dataField}
    const sortedFieldIds = [id]
    const values = generateData(dataFieldList, sortedFieldIds, 10);

    // store
    const colorMode = useSelector(selectColorMode);

    // actions
    const handleResetGeneratorOptions = () => {
        const defaultOptions = getGeneratorDefaultOptionsByDataType(dataField.dataType);
        const defaultValueType = getGeneratorDefaultValueTypeByDataType(dataField.dataType);
        let field = {...dataField, dataTypeOptions: defaultOptions, valueType: defaultValueType};
        dispatch(doUpdateDataField(id, field));
    }


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

            <Modal width={'90%'}
                   title={`Debugger: ${dataField.fieldName ? dataField.fieldName : "Unnamed"}`}
                   visible={isModalOpen}
                   onCancel={handleClose} footer={null}>

                <div  style={{height:'700px',overflowY:"auto", marginBottom:10}}>
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
                                <div style={{display: "flex"}}>
                                    {renderDataTypeOptions()}
                                </div>
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
                            <Button size={'small'} style={{marginTop: 6}}
                                    onClick={handleResetGeneratorOptions}>Reset</Button>
                        </Descriptions.Item>
                        <Descriptions.Item itemKey="Example Output">
                            <Space spacing={5} wrap>
                            {
                                Object.entries(formatters).map(([format, FormatterComponent], index) => {
                                    return <GenerateResultsPreviewer key={index} values={values} fields={dataFieldList}
                                                                     sortedFieldIds={sortedFieldIds}
                                                                     formatType={FormatterComponent.type}/>
                                })
                            }
                            </Space>
                        </Descriptions.Item>
                    </Descriptions>
                </div>
            </Modal>
        </>
    )
}

