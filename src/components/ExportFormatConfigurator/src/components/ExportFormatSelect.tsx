import React, {useMemo} from 'react';
import {Select, Typography} from "@douyinfe/semi-ui";
import {getFormatterByFormat, getFormattersGroupedByCategory} from "@/utils/formatterUtils";
import {Formatter} from "@/types/formatter";
import Image from "next/image";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import styles from './ExportFormatSelect.module.css';
import {doChangeExportFormat} from "@/reducers/exporter/exporterActions";


export interface ExportFormatSelectProps {
}

export const ExportFormatSelect: React.FunctionComponent<ExportFormatSelectProps> = () => {
    const intl = useIntl();
    const {Text} = Typography;
    const data = useMemo(() => getFormattersGroupedByCategory(), []);
    const dispatch = useDispatch();

    // store
    const colorMode = useSelector((state: Store) => state.app.colorMode);
    const exportFormat = useSelector((state: Store) => state.exporter.exportFormat);

    // actions
    const handleSelectChange = (value) => {
        dispatch(doChangeExportFormat(value));
    }

    // render
    const renderOptionItem = (formatter: Formatter) => {
        return (
            <Select.Option className={styles.selectOption} value={formatter.type} key={formatter.type} showTick={true}>
                <Image alt={formatter.type}
                       src={`/images/exportFormats/${colorMode}/${formatter.type}.svg`}
                       width={32} height={32}/>
                <div className={styles.label}>
                    <Text>{formatter.type}</Text>
                </div>
            </Select.Option>
        )
    }

    const renderSelectedItem = (optionNode) => (
        <div className={styles.selectedItem}>
            <Image alt={optionNode.value}
                   src={`/images/exportFormats/${colorMode}/${optionNode.value}.svg`}
                   width={32} height={32}/>
            <div className={styles.label}>
                <Text>{optionNode.value}</Text>
            </div>
        </div>
    );


    return (
        <div>
            <Select
                style={{width: "100%", height: 50}}
                onChange={handleSelectChange}
                value={exportFormat}
                renderSelectedItem={renderSelectedItem}
            >
                {Object.entries(data).map(([category]) => {
                    return <Select.OptGroup key={category}
                                            label={intl.formatMessage({id: `export.category.${category}`})}>

                        {data[category].map((formatter: Formatter) => {
                            return renderOptionItem(formatter)
                        })}

                    </Select.OptGroup>
                })}
            </Select>
        </div>
    )
}