import React from "react";
import {Button, Divider} from "@douyinfe/semi-ui";
import styles from './SettingBar.module.css';
import {RegeneratePreviewButton} from "@/components/PreviewPanel/src/components/SettingBar/RegeneratePreviewButton";
import {ShowLineNumberSwitch} from "@/components/PreviewPanel/src/components/SettingBar/ShowLineNumberSwitch";
import {LineWarpSwitch} from "@/components/PreviewPanel/src/components/SettingBar/LineWarpSwitch";
import {FontSizeSelect} from "@/components/PreviewPanel/src/components/SettingBar/FontSizeSelect";

export type SettingBarProps = {}

export const SettingBar: React.FunctionComponent<SettingBarProps> = ({...props}) => {


    return (
        <div className={styles.settingBar}>
            <RegeneratePreviewButton/>
            <Divider layout={'vertical'}/>
            <ShowLineNumberSwitch/>
            <LineWarpSwitch/>
            <Divider layout={'vertical'} className={'margin-left-6'}/>
            <FontSizeSelect/>
        </div>
    )
}