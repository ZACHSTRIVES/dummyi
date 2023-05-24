import React, {useMemo} from "react";
import styles from './DataTypeSelectModal.module.scss';
import {Button, Card, CardGroup, Input, Modal, TabPane, Tabs, Tag, Typography} from "@douyinfe/semi-ui";
import {IconClose, IconSearch} from "@douyinfe/semi-icons";
import {FormattedMessage, useIntl} from "@/locale";
import {getGeneratorList} from "@/utils/generatorUtils";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doCloseDataTypeSelectModal, doUpdateDataFields} from "@/reducers/workspace/workspaceActions";
import {ColorMode} from "@/constants/enums";
import {Generator} from "@/types/generator";


export interface DataTypeSelectModalProps {
}

export const DataTypeSelectModal: React.FunctionComponent<DataTypeSelectModalProps> = ({...props}) => {
    const intl = useIntl();
    const {Title} = Typography;
    const dispatch = useDispatch();

    // store
    const open = useSelector((state: Store) => state.workspace.showDataTypeSelectModal);
    const colorMode = useSelector((state: Store) => state.app.colorMode);
    const currentDataTypeSelectModalTargetField = useSelector((state: Store) => state.workspace.currentDataTypeSelectModalTargetField);
    const dataFields = useSelector((state: Store) => state.workspace.dataFields);
    const [searchText, setSearchText] = React.useState(null);
    const data = useMemo(() => getGeneratorList(searchText, intl), [intl, searchText]);

    // actions

    const handleSelect = (item: Generator) => {
        const newDataFields = dataFields.map(field => {
            if (field.id === currentDataTypeSelectModalTargetField.id) {
                field = {...field, dataType: item.type};
                if (field.dataType && field.fieldName) {
                    field.isDraft = false;
                } else {
                    field.isDraft = true;
                }
                return field;
            }
            return field;
        });
        dispatch(doUpdateDataFields(newDataFields));
        onCancel();
    }

    const onCancel = () => {
        dispatch(doCloseDataTypeSelectModal());
        setSearchText(null);
    }

    // renders
    const renderHeader = () => {
        return (
            <div className={styles.dataTypeSelectModalHeader}>
                <div className={styles.dataTypeSelectModalHeader__titleSection}>
                    <Title heading={5}
                           className={styles.dataTypeSelectModalHeader__title}
                    >
                        {intl.formatMessage({id: 'dataFields.type.modal.title'})}
                    </Title>
                    <Input
                        value={searchText}
                        onChange={(v) => setSearchText(v)}
                        className={styles.dataTypeSelectModalHeader__searchBar}
                        prefix={<IconSearch/>}
                        placeholder={intl.formatMessage({id: 'dataFields.type.modal.search.placeholder'})}
                        showClear
                    />
                </div>
                <Button theme={'borderless'} onClick={onCancel} icon={<IconClose size={'large'}/>}></Button>
            </div>
        )
    }

    return (
        <Modal
            style={{width: '95vw', maxWidth: '800px', height: '90vh', maxHeight: '600px'}}
            visible={open}
            onCancel={onCancel}
            header={renderHeader()}
            footer={null}>
            <Tabs tabPosition="left" type={'button'}>
                {Object.entries(data).map(([category], index) => {
                    return (
                        <TabPane
                            key={index}
                            tab={
                                <div className={styles.dataTypeSelectModalTab}>
                                    <FormattedMessage id={`dataType.category.${category}`}/>
                                    <Tag style={{width: '35px'}}
                                         type={colorMode === ColorMode.LIGHT ? 'light' : 'solid'}>
                                        {data[category].length}
                                    </Tag>
                                </div>
                            }
                            itemKey={category}
                        >
                            <div className={styles.dataTypeSelectModalItemList}>
                                <CardGroup spacing={10}>
                                    {
                                        data[category].map((item) => (
                                            <div key={item.type} onClick={() => {
                                                handleSelect(item)
                                            }}>
                                                <Card
                                                    shadows='hover'
                                                    title={item.displayName}
                                                    className={`${item.type === (currentDataTypeSelectModalTargetField?.dataType || null) ?
                                                        styles.dataTypeSelectModalCard__selected : styles.dataTypeSelectModalCard} no-select-area`}>
                                                    {
                                                        item.exampleLines && item.exampleLines.map((example, index) => (
                                                            <div key={index}
                                                                 className={styles.dataTypeSelectModalCard__example}>
                                                                {example}
                                                            </div>
                                                        ))
                                                    }
                                                </Card>
                                            </div>
                                        ))
                                    }
                                </CardGroup>
                            </div>
                        </TabPane>
                    )
                })}
            </Tabs>
        </Modal>
    );
}