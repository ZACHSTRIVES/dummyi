import React from 'react';
import styles from './DataFieldsListItem.module.scss';
import {Divider, Button} from "@douyinfe/semi-ui";
import {IconClose, IconHandle, IconSetting} from "@douyinfe/semi-icons";
import {Draggable} from "react-beautiful-dnd";
import {DataField} from "@/types/generator";
import {useDispatch} from "react-redux";
import {
    doDeleteDataField,
    doOpenDataTypeOptionsModal,
    doOpenDataTypeSelectModal,
    doUpdateDataField, doUpdateDataFieldName,
} from "@/reducers/workspace/workspaceActions";
import {FormattedMessage, useIntl} from "@/locale";
import {ComponentSize, ValueType} from "@/constants/enums";
import {getGeneratorOptionsComponentByDataType} from "@/utils/generatorUtils";
import {OptionsButton, OptionsInput, OptionsNumberInput} from "@/components/Utils";
import {isNullOrWhiteSpace} from "@/utils/stringUtils";
import {GeneratorDebugger} from "@/components/DevTools";
import {inDevEnvironment} from "@/utils/devUtils";
import {hasValue} from "@/utils/typeUtils";

export interface DataFieldsListItemItemProps {
    id: string;
    index: number;
    dataField: DataField;
    size?: ComponentSize;
}

export const DataFieldsListItem: React.FunctionComponent<DataFieldsListItemItemProps> = ({...props}) => {
    const {id, index, dataField, size} = props;
    const dispatch = useDispatch();
    const intl = useIntl();
    const OptionsComponent = dataField.dataType && getGeneratorOptionsComponentByDataType(dataField.dataType);

    const getItemStyle = (isDragging, draggableStyle) => ({
        backgroundColor: isDragging ? "rgba(var(--semi-grey-0), 0.5)" : null,
        ...draggableStyle
    });

    // actions
    const handleUpdateDataField = (changedFieldName: string, value: any) => {
        if (changedFieldName === 'fieldName') {
            dispatch(doUpdateDataFieldName(id, value))
        } else {
            const field = {...dataField, [changedFieldName]: value};
            dispatch(doUpdateDataField(id, field));
        }
    };

    const handleOptionValueChange = (fieldName: string, value: any, valueType?: ValueType) => {
        let field = {...dataField, dataTypeOptions: {...dataField.dataTypeOptions, [fieldName]: value}};
        if (hasValue(valueType)) {
            field.valueType = valueType;
        }
        dispatch(doUpdateDataField(id, field));
    };

    const handleDelete = () => {
        dispatch(doDeleteDataField(id));
    };

    const handleOpenDataTypeSelectModal = () => {
        dispatch(doOpenDataTypeSelectModal(id));
    };

    const handleOpenDataTypeOptionsModal = () => {
        dispatch(doOpenDataTypeOptionsModal(id));
    };

    // renders
    const renderDataTypeOptions = () => {
        if (!dataField.dataType) return null;
        return OptionsComponent ?
            <OptionsComponent
                options={dataField.dataTypeOptions}
                handleOptionValueChange={handleOptionValueChange}
            /> : null
    };

    const renderEmptyRateInput = () => {
        return (
            <OptionsNumberInput
                label={<FormattedMessage id={'dataFields.input.emptyRate.label'}/>}
                value={dataField.emptyRate}
                onChange={(value) => handleUpdateDataField('emptyRate', value)}
                style={{width: '100px'}}
                suffix={"%"}
                infoTooltip={<FormattedMessage id={'dataFields.input.emptyRate.tooltip'}/>}
                errorMessage={errorMessages.emptyRate}
                min={0}
                max={100}
            />)
    };

    // error validation
    const [errorMessages, setErrorMessages] = React.useState({
        fieldName: '',
        emptyRate: '',
    });

    React.useEffect(() => {
        const newErrorMessages = {...errorMessages};
        if (!dataField.isDraft) {
            if (isNullOrWhiteSpace(dataField.fieldName)) {
                newErrorMessages.fieldName = intl.formatMessage({id: 'dataFields.input.fieldName.errorMessage.empty'});
            } else {
                newErrorMessages.fieldName = '';
            }
            if (isNullOrWhiteSpace(dataField.emptyRate.toString())) {
                newErrorMessages.emptyRate = intl.formatMessage({id: 'dataFields.input.emptyRate.errorMessage.empty'});
            } else {
                newErrorMessages.emptyRate = '';
            }
        } else {
            newErrorMessages.fieldName = '';
            newErrorMessages.emptyRate = '';
        }

        setErrorMessages(newErrorMessages);
    }, [dataField.fieldName, dataField.emptyRate, dataField.isDraft]);


    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef}
                     {...provided.draggableProps}
                     style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <div className={styles.dataFieldItem}>
                        <div>
                            <div className={styles.dataFieldItem__content}>
                                <div className={styles.dataFieldItem__header} {...provided.dragHandleProps}>
                                    <IconHandle size="large" style={{cursor: 'move'}}/>
                                    <div>#{index + 1}</div>
                                </div>
                                <OptionsButton
                                    label={<FormattedMessage id="dataFields.input.type.label"/>}
                                    onClick={handleOpenDataTypeSelectModal}
                                    style={{
                                        width: 140,
                                        fontSize: '13px',
                                        fontWeight: 'normal',
                                        justifyContent: 'left'
                                    }}
                                    text={dataField.dataType ?
                                        <FormattedMessage id={`dataType.${dataField.dataType}`}/> :
                                        <FormattedMessage id={`dataFields.input.type.placeholder`}/>}
                                />
                                <OptionsInput
                                    label={<FormattedMessage id="dataFields.input.fieldName.label"/>}
                                    value={dataField.fieldName}
                                    onChange={(value) => handleUpdateDataField('fieldName', value)}
                                    style={{width: '100px'}}
                                    errorMessage={errorMessages.fieldName}
                                />
                                {size !== ComponentSize.SMALL && (
                                    <>
                                        {renderEmptyRateInput()}
                                        {(size !== ComponentSize.LARGE && dataField.dataType && OptionsComponent) &&
                                            <OptionsButton
                                                label={<FormattedMessage id="dataFields.input.options.label"/>}
                                                onClick={handleOpenDataTypeOptionsModal}
                                                style={{width: 80}}
                                                icon={<IconSetting/>}
                                            />}
                                    </>
                                )}
                                {size === ComponentSize.LARGE && renderDataTypeOptions()}
                            </div>
                        </div>

                        <div>
                            <div className="generatorConfig_column">
                                <Button
                                    onClick={handleDelete}
                                    style={{color: '#c7c4c4'}}
                                    theme="borderless"
                                    icon={<IconClose/>}
                                />
                                {size === ComponentSize.SMALL && (
                                    <Button onClick={handleOpenDataTypeOptionsModal}
                                            style={{color: '#c7c4c4'}} theme="borderless" icon={<IconSetting/>}/>
                                )}

                                {
                                    inDevEnvironment &&
                                    <GeneratorDebugger
                                        id={id}
                                        dataField={dataField}
                                        renderDataTypeOptions={renderDataTypeOptions}/>
                                }

                            </div>
                        </div>
                    </div>
                    <Divider style={{marginTop: '12px'}}/>
                </div>
            )}
        </Draggable>
    )
}