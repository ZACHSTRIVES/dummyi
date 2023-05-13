import React, {useRef} from 'react';
import {Toolbar} from "@/components/Toolbar";

import styles from "./InputPanel.module.css";


export type InputPanelProps = {}

export const InputPanel: React.FunctionComponent<InputPanelProps> = () => {


    return (
        <div className={styles.inputPanel}>
            <div className={styles.background} />
            <Toolbar/>
        </div>
    );
};


