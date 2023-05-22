import React from 'react';
import {Button} from "@douyinfe/semi-ui";
import {IconAppCenter} from "@douyinfe/semi-icons";
import {DataTypeSelectModal} from "@/components/DataTypeSelector/src/components";

export interface DataTypeSelectorProps {
}

export const DataTypeSelector: React.FunctionComponent<DataTypeSelectorProps> = () => {
    const [showModal, setShowModal] = React.useState(false);


    return (
        <>
            <Button onClick={()=>{setShowModal(true)}} style={{width: 120}} icon={<IconAppCenter/>}>Number</Button>
            <DataTypeSelectModal open={showModal} onOk={()=>{}} onCancel={()=>{setShowModal(false)}} />
        </>
    )
}