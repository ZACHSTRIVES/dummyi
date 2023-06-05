import React from "react";
import {Button, Tooltip} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {IconOrderedList} from "@douyinfe/semi-icons";
import {useDispatch, useSelector} from "react-redux";
import {doSetRawViewShowLineNumbers} from "@/reducers/preview/previewActions";
import {selectRawViewLineWrap} from "@/reducers/preview/previewSelectors";


export type LineWarpSwitchProps = {}

export const ShowLineNumberSwitch: React.FunctionComponent<LineWarpSwitchProps> = ({...props}) => {
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const showLineNumber = useSelector(selectRawViewLineWrap);

    // action
    const toggleShowLineNumber = () => {
        dispatch(doSetRawViewShowLineNumbers(!showLineNumber));
    }

    return (
        <Tooltip
            position={'bottom'}
            trigger={'hover'}
            content={intl.formatMessage({id: showLineNumber ? "preview.setting.lineNumberSwitch.tooltip.hide" : "preview.setting.lineNumberSwitch.tooltip.show"})}
        >
            <Button
                className={'margin-left-6'}
                theme={showLineNumber ? 'light' : 'borderless'}
                type={'tertiary'}
                icon={<IconOrderedList size={'extra-large'}/>}
                onClick={toggleShowLineNumber}
            />
        </Tooltip>
    )
}

