import React from 'react';
import {Toolbar} from "@/components/Toolbar";
import styles from "./InputPanel.module.css";

export type InputPanelProps = {}

export const InputPanel: React.FunctionComponent<InputPanelProps> = () => {
    return (
        <div>
            <div className={styles.background} />
            <Toolbar/>
        </div>
    );
};


