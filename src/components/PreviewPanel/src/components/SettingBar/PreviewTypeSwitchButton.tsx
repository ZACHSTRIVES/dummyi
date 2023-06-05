import React from 'react';
import {Button, Radio, RadioGroup} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {ComponentSize, PreviewType} from "@/constants/enums";
import {useDispatch, useSelector} from "react-redux";
import {doSetPreviewType} from "@/reducers/preview/previewActions";
import {selectPreviewType} from "@/reducers/preview/previewSelectors";

export type PreviewTypeSwitchButtonProps = {
    size: ComponentSize;
}

export const PreviewTypeSwitchButton: React.FC<PreviewTypeSwitchButtonProps> = ({...props}) => {
    const intl = useIntl();

    // store
    const previewType = useSelector(selectPreviewType);

    // actions
    const dispatch = useDispatch();
    const handlePreviewTypeChange = (previewType: PreviewType) => {
        dispatch(doSetPreviewType(previewType));
    }

    return (
        <>
            {
                props.size === ComponentSize.LARGE ?
                    <RadioGroup style={{height:'32px'}} type='button' value={previewType} onChange={(e)=>{handlePreviewTypeChange(e.target.value)}}>
                        <Radio value={PreviewType.RAW} >{intl.formatMessage({id: 'preview.setting.rawView.text'})}</Radio>
                        <Radio value={PreviewType.TABLE}>{intl.formatMessage({id: 'preview.setting.tableView.text'})}</Radio>
                    </RadioGroup>
                    :
                    <Button
                        onClick={() => handlePreviewTypeChange(previewType === PreviewType.RAW ? PreviewType.TABLE : PreviewType.RAW)}
                        type='primary'>
                        {previewType === PreviewType.RAW ?
                            intl.formatMessage({id: 'preview.setting.rawView.text'})
                            :
                            intl.formatMessage({id: 'preview.setting.tableView.text'})}
                    </Button>
            }
        </>)

}