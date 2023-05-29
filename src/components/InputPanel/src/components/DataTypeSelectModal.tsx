import React, {useMemo} from "react";
import styles from './DataTypeSelectModal.module.scss';
import {Button, Card, CardGroup, Input, Modal, TabPane, Tabs, Tag, Typography} from "@douyinfe/semi-ui";
import {IconClose, IconSearch} from "@douyinfe/semi-icons";
import {FormattedMessage, useIntl} from "@/locale";
import {getGeneratorList} from "@/utils/generatorUtils";
import {useDispatch, useSelector} from "react-redux";
import {doChangeDataType, doCloseDataTypeSelectModal} from "@/reducers/workspace/workspaceActions";
import {ColorMode} from "@/constants/enums";
import {Generator} from "@/types/generator";
import {
    selectCurrentDataTypeSelectModalTargetField,
    selectCurrentDataTypeSelectModalTargetFieldId,
    selectShowDataTypeSelectModal
} from "@/reducers/workspace/workspaceSelectors";
import {selectColorMode} from "@/reducers/app/appSelectors";


export interface DataTypeSelectModalProps {
}

export const DataTypeSelectModal: React.FunctionComponent<DataTypeSelectModalProps> = ({...props}) => {
    const intl = useIntl();
    const {Title} = Typography;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState(null);
    const data = useMemo(() => getGeneratorList(searchText, intl), [intl, searchText]);

    // store
    const open = useSelector(selectShowDataTypeSelectModal);
    const colorMode = useSelector(selectColorMode);
    const currentTargetDataField = useSelector(selectCurrentDataTypeSelectModalTargetField);
    const currentTargetDataFieldId = useSelector(selectCurrentDataTypeSelectModalTargetFieldId);

    // actions
    const handleSelect = (item: Generator) => {
        dispatch(doChangeDataType(currentTargetDataFieldId,item.type));
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
                                                    className={`${item.type === (currentTargetDataField?.dataType || null) ?
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