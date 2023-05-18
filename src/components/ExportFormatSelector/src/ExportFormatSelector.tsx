import React from 'react';
import {Button} from "@douyinfe/semi-ui";
import {Formatter} from "@/types/formatter";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {ExportFormatSelectModal} from "@/components/ExportFormatSelector/src/components";

export interface ExportFormatSelectorProps {
}

export const ExportFormatSelector: React.FunctionComponent<ExportFormatSelectorProps> = () => {

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
            <ExportFormatSelectModal
                open={isSelectModalOpen}
                onClose={() => {
                    setIsSelectModalOpen(false)
                }}
            />
        </>
    )
};