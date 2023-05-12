import React from 'react';
import {Toolbar} from "@/components/Toolbar";
import Styles from './InputPanel.module.css';


export type InputPanelProps = {}

export const InputPanel: React.FunctionComponent<InputPanelProps> = () => {
    return (
        <div className={Styles.inputPanel}>
            <Toolbar/>
        </div>
    );
};


