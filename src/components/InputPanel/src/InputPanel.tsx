import React, {useEffect, useRef} from 'react';
import {Toolbar} from "@/components/Toolbar";

import styles from "./InputPanel.module.css";
import {DataFieldsList} from "@/components/InputPanel/src/components";
import {ComponentSize} from "@/constants/enums";


export type InputPanelProps = {}

export const InputPanel: React.FunctionComponent<InputPanelProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setPanelHeight] = React.useState(800);
    const [containerWidth, setPanelWidth] = React.useState(800);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const containerHeight = entries[0].contentRect.height;
            const containerWidth = entries[0].contentRect.width;

            setPanelHeight(containerHeight);
            setPanelWidth(containerWidth)
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef]);
    return (
        <div className={styles.inputPanel} ref={containerRef}>
            <div className={styles.background} />
            <Toolbar/>
            <DataFieldsList height={containerHeight-64}  />
        </div>
    );
};


