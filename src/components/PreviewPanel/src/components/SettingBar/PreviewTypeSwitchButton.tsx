import React from 'react';
import {Button, ButtonGroup} from "@douyinfe/semi-ui";
import {useIntl} from "@/locale";
import {ComponentSize, PreviewType} from "@/constants/enums";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetPreviewType} from "@/reducers/preview/previewActions";

export type PreviewTypeSwitchButtonProps = {
    size: ComponentSize;
}

export const PreviewTypeSwitchButton: React.FC<PreviewTypeSwitchButtonProps> = ({...props}) => {
    const intl = useIntl();

    // store
    const previewType = useSelector((state: Store) => state.preview.previewType);

    // actions
    const dispatch = useDispatch();
    const handlePreviewTypeChange = (previewType: PreviewType) => {
        dispatch(doSetPreviewType(previewType));
    }

    return (
        <>
            {
                props.size === ComponentSize.LARGE ?
                    <ButtonGroup>
                        <Button
                            onClick={() => handlePreviewTypeChange(PreviewType.RAW)}
                            type={previewType === PreviewType.RAW ? "primary" : "tertiary"}>
                            {intl.formatMessage({id: 'preview.setting.rawView.text'})}
                        </Button>
                        <Button
                            onClick={() => handlePreviewTypeChange(PreviewType.TABLE)}
                            type={previewType === PreviewType.TABLE ? "primary" : "tertiary"}>
                            {intl.formatMessage({id: 'preview.setting.tableView.text'})}
                        </Button>
                    </ButtonGroup>
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