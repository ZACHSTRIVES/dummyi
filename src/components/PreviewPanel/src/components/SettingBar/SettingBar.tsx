import React from "react";
import {Divider} from "@douyinfe/semi-ui";
import styles from './SettingBar.module.css';
import {RegeneratePreviewButton} from "@/components/PreviewPanel/src/components/SettingBar/RegeneratePreviewButton";
import {ShowLineNumberSwitch} from "@/components/PreviewPanel/src/components/SettingBar/ShowLineNumberSwitch";
import {LineWarpSwitch} from "@/components/PreviewPanel/src/components/SettingBar/LineWarpSwitch";
import {FontSizeSelect} from "@/components/PreviewPanel/src/components/SettingBar/FontSizeSelect";
import {CopyToClipboardButton} from "@/components/PreviewPanel/src/components/SettingBar/CopyToClipboardButton";
import {PreviewTypeSwitchButton} from "@/components/PreviewPanel/src/components/SettingBar/PreviewTypeSwitchButton";
import {ComponentSize, PreviewType} from "@/constants/enums";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";

export type SettingBarProps = {
    size: ComponentSize;
}

export const SettingBar: React.FunctionComponent<SettingBarProps> = ({...props}) => {

    // store
    const previewType = useSelector((state: Store) => state.preview.previewType);


    return (
        <div className={styles.settingBar}>
            <div className={styles.tools}>
                <RegeneratePreviewButton/>

                {
                    previewType === PreviewType.RAW &&
                    <>
                        <CopyToClipboardButton/>
                        <Divider layout={'vertical'} className={'margin-left-6'}/>
                        <ShowLineNumberSwitch/>
                        <LineWarpSwitch/>
                        <Divider layout={'vertical'} className={'margin-left-6'}/>
                        <FontSizeSelect/>
                    </>
                }

            </div>

            <div className={styles.switchButton}>
                <PreviewTypeSwitchButton size={props.size}/>
            </div>
        </div>
    )
}