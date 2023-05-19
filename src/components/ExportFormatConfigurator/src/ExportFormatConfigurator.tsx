import React from 'react';
import {Button} from "@douyinfe/semi-ui";
import {Formatter} from "@/types/formatter";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {ExportFormatConfiguratorModal} from "@/components/ExportFormatConfigurator/src/components";

export interface ExportFormatConfiguratorProps {
}

export const ExportFormatConfigurator: React.FunctionComponent<ExportFormatConfiguratorProps> = () => {

    const [isSelectModalOpen, setIsSelectModalOpen] = React.useState(false);

    // store
    const exportType = useSelector((state: Store) => state.exporter.exportType);

    return (
        <>
            <Button
                onClick={() => {
                    setIsSelectModalOpen(true)
                }}
                theme='light'
                style={{marginRight: 8, width: "100px"}}>
                {exportType}
            </Button>
            <ExportFormatConfiguratorModal
                open={isSelectModalOpen}
                onClose={() => {
                    setIsSelectModalOpen(false)
                }}
            />
        </>
    )
};