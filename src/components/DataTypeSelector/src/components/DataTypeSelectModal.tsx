import React from "react";
import styles from './DataTypeSelectModal.module.scss';
import {Button, Card, CardGroup, Input, List, Modal, TabPane, Tabs, Tag, Typography} from "@douyinfe/semi-ui";
import {IconClose, IconSearch} from "@douyinfe/semi-icons";

export interface DataTypeSelectModalProps {
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
}

export const DataTypeSelectModal: React.FunctionComponent<DataTypeSelectModalProps> = ({...props}) => {
    const {open, onCancel, onOk} = props;
    const {Title} = Typography;

    // renders
    const renderHeader = () => {
        return (
            <div className={styles.dataTypeSelectModalHeader}>
                <div className={styles.dataTypeSelectModalHeader__titleSection}>
                    <Title heading={5}
                           className={styles.dataTypeSelectModalHeader__title}
                    >
                        Data types
                    </Title>
                    <Input
                        className={styles.dataTypeSelectModalHeader__searchBar}
                        prefix={<IconSearch/>}
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
            onOk={onOk}
            header={renderHeader()}
            footer={null}
        >
            <Tabs tabPosition="left" type={'button'}>
                <TabPane
                    tab={
                        <div className={styles.dataTypeSelectModalTab}>
                            All
                            <Tag type={'solid'}>14</Tag>
                        </div>
                    }
                    itemKey="1"
                >
                    <div className={styles.dataTypeSelectModalItemList}>
                        <CardGroup spacing={10}>
                            {
                                new Array(30).fill(null).map((v, idx) => (
                                    <Card
                                        key={idx}
                                        shadows='hover'
                                        title='Card title'
                                        style={{width: 170}}
                                    >
                                        Card content
                                    </Card>
                                ))
                            }
                        </CardGroup>
                    </div>
                </TabPane>
            </Tabs>

        </Modal>
    );
}