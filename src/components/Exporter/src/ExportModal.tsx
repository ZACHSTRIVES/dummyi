import React from 'react';
import {Modal} from "@douyinfe/semi-ui";
import {ExportFormatConfigurator} from "@/components/ExportFormatConfigurator";
import {NumbOfRowInput} from "@/components/Toolbar/src/components/NumOfRowInput";

export interface ExportModalProps {

}

export const ExportModal:React.FunctionComponent<ExportModalProps> = () => {
    return(
        <Modal visible={true} title="导出" onCancel={()=>{}} onOk={()=>{}}>

        </Modal>
    )
}