import React from 'react';
import {Formatter} from "@/types/formatter";
import {Card, Typography} from "@douyinfe/semi-ui";
import Image from "next/image";
import {ColorMode} from "@/constants/enums";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";

export interface ExportFormatSelectorProps {
    formatter: Formatter;
}

export const ExportFormatSelectItem: React.FunctionComponent<ExportFormatSelectorProps> = ({...props}) => {
    const {formatter} = props;
    const {Text} = Typography;
    const {Meta} = Card;

    // store
    const colorMode: ColorMode = useSelector((state: Store) => state.app.colorMode);

    return (
        <Card
            shadows='hover'
            style={{minWidth:140, height: 60, cursor: 'pointer'}}
            bodyStyle={{padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
        >
            <Meta
                avatar={<Image alt={formatter.type} src={`/images/exportFormats/${colorMode}/${formatter.type}.svg`}
                               width={32} height={32}/>}
                title={
                    <Text style={{fontSize: 12, fontWeight: 500}}>{formatter.type}</Text>
            }
            />
        </Card>
    )

}