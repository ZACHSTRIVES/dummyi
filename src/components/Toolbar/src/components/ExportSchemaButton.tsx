import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconExport} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";


export type ExportSchemaButtonProps = {}

export const ExportSchemaButton: React.FC<ExportSchemaButtonProps> = () => {
    const intl = useIntl();

    return (
        <Tooltip position={'bottom'} content={intl.formatMessage({id: "toolbar.exportSchemaButton.tooltip"})}>
            <Button theme={"borderless"} type='tertiary' icon={<IconExport size={'large'}/>}/>
        </Tooltip>
    )
}