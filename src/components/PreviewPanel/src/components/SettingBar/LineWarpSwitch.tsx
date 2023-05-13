import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {IconAlignLeft} from "@douyinfe/semi-icons";
import {useIntl} from "@/locale";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetRawViewLineWrap, doSetRawViewShowLineNumbers} from "@/reducers/preview/previewActions";

export type LineWarpSwitchProps = {}

export const LineWarpSwitch: React.FunctionComponent<LineWarpSwitchProps> = ({...props}) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const lineWarp = useSelector((state: Store) => state.preview.rawViewLineWrap);

    // action
    const toggleLineWarp = () => {
        dispatch(doSetRawViewLineWrap(!lineWarp));
    }

    return (
        <Tooltip
            position={'bottom'}
            trigger={'hover'}
            content={intl.formatMessage({id: lineWarp ? "preview.setting.lineWarpSwitch.tooltip.disable" : "preview.setting.lineWarpSwitch.tooltip.enable"})}
        >
            <Button
                className={'margin-left-6'}
                theme={lineWarp? 'light' : 'borderless'}
                type={'tertiary'}
                icon={<IconAlignLeft size={'extra-large'}/>}
                onClick={toggleLineWarp}
            />
        </Tooltip>
    )
}


