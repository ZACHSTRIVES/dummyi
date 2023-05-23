import React, {useMemo} from "react";
import styles from './DataTypeSelectModal.module.scss';
import {Button, Card, CardGroup, Input, Modal, TabPane, Tabs, Tag, Typography} from "@douyinfe/semi-ui";
import {IconClose, IconSearch} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {getGeneratorList} from "@/utils/generatorUtils";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doCloseDataTypeSelectModal} from "@/reducers/workspace/workspaceActions";

export interface DataTypeSelectModalProps {}

export const DataTypeSelectModal: React.FunctionComponent<DataTypeSelectModalProps> = ({...props}) => {
    const intl = useIntl();
    const {Title} = Typography;
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState('');

    // store
    const open = useSelector((state: Store) => state.workspace.showDataTypeSelectModal);
    const data = useMemo(() => getGeneratorList(searchText, intl), [intl, searchText]);

    // actions
    const onCancel = () => {
        dispatch(doCloseDataTypeSelectModal());
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
            footer={null}
        >
            <Tabs tabPosition="left" type={'button'}>
                {Object.entries(data).map(([category], index) => {
                    return (
                        <TabPane
                            key={index}
                            tab={
                                <div className={styles.dataTypeSelectModalTab}>
                                    {intl.formatMessage({id: `dataType.category.${category}`})}
                                    <Tag type={'solid'}>{data[category].length}</Tag>
                                </div>
                            }
                            itemKey={category}
                        >
                            <div className={styles.dataTypeSelectModalItemList}>
                                <CardGroup spacing={10}>
                                    {
                                        data[category].map((item) => (
                                            <Card
                                                key={item.type}
                                                shadows='hover'
                                                title={item.displayName}
                                                style={{width: 170}}
                                            >
                                                Card content
                                            </Card>
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