import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconImport} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {className} from "postcss-selector-parser";


export type ImportSchemaButtonProps = {
    className?: string,
}

export const ImportSchemaButton: React.FC<ImportSchemaButtonProps> = ({...props}) => {
    const intl = useIntl();

    return (
        <Tooltip position={'bottom'} content={intl.formatMessage({id: "toolbar.importSchemaButton.tooltip"})} {...props} >
            <Button theme={"borderless"} type='tertiary' icon={<IconImport size={'large'}/>}/>
        </Tooltip>
    )
}