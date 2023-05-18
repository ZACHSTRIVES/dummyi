import React, {useCallback} from 'react';
import {Typography, Modal, Badge, Divider, List, Space} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {getFormattersGroupedByCategory} from "@/utils/categoriesUtils";
import {formatters} from "@/core/formatters";
import {ExportFormatSelectItem} from "./ExportFormatSelectItem";


export type ExportFormatSelectModalProps = {
    open: boolean;
    onClose: () => void;
}

export const ExportFormatSelectModal: React.FC<ExportFormatSelectModalProps> = ({...props}) => {
    const intl = useIntl();
    const {open, onClose} = props;

    // render
    const Menu = useCallback(() => {
        const {Text} = Typography;
        const data = getFormattersGroupedByCategory(formatters);
        return (
            <div>
                {Object.entries(data).map(([category]) => {
                    return <div key={category} style={{marginBottom: '12px'}}>

                        <Text style={{fontSize: 12, fontWeight: 500}}>
                            {intl.formatMessage({id: `export.category.${category}`})}
                        </Text>

                        <List
                            style={{margin: '12px 0'}}
                            layout="horizontal"
                            grid={{gutter: 12, xs:12, sm: 7, md: 7}}
                            dataSource={data[category]}
                            renderItem={item => (
                                <List.Item>
                                    <ExportFormatSelectItem formatter={item}/>
                                </List.Item>
                            )}
                        />
                    </div>
                })}
            </div>
        )
    }, []);


    return (
        <Modal
            visible={open}
            title={intl.formatMessage({id: 'export.selector.modal.title'})}
            style={{width: '95vw', maxWidth: '600px'}}
            onCancel={onClose}
           >
            <Menu/>
        </Modal>
    )
}