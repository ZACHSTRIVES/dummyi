import React from "react";
import {Button, Divider} from "@douyinfe/semi-ui";
import styles from './SettingBar.module.css';
import {RegeneratePreviewButton} from "@/components/PreviewPanel/src/components/SettingBar/RegeneratePreviewButton";
import {ShowLineNumberSwitch} from "@/components/PreviewPanel/src/components/SettingBar/ShowLineNumberSwitch";
import {LineWarpSwitch} from "@/components/PreviewPanel/src/components/SettingBar/LineWarpSwitch";
import {FontSizeSelect} from "@/components/PreviewPanel/src/components/SettingBar/FontSizeSelect";
import {CopyToClipboardButton} from "@/components/PreviewPanel/src/components/SettingBar/CopyToClipboardButton";

export type SettingBarProps = {}

export const SettingBar: React.FunctionComponent<SettingBarProps> = ({...props}) => {


    return (
        <div className={styles.settingBar}>
            <RegeneratePreviewButton/>
            <CopyToClipboardButton/>
            <Divider layout={'vertical'} className={'margin-left-6'}/>
            <ShowLineNumberSwitch/>
            <LineWarpSwitch/>
            <Divider layout={'vertical'} className={'margin-left-6'}/>
            <FontSizeSelect/>
        </div>
    )
}