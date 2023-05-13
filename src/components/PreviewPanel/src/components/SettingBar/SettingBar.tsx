import React from "react";
import {Button} from "@douyinfe/semi-ui";
import styles from './SettingBar.module.css';
import {RefreshButton} from "@/components/PreviewPanel/src/components/SettingBar/RegeneratePreviewButton";
import {ShowLineNumberSwitch} from "@/components/PreviewPanel/src/components/SettingBar/ShowLineNumberSwitch";
import {LineWarpSwitch} from "@/components/PreviewPanel/src/components/SettingBar/LineWarpSwitch";

export type SettingBarProps = {

}

export const SettingBar: React.FunctionComponent<SettingBarProps> = ({...props}) => {


    return (
        <div className={styles.settingBar} >
            <RefreshButton/>
            <ShowLineNumberSwitch/>
            <LineWarpSwitch/>
        </div>
    )
}