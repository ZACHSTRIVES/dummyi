import React, {useEffect, useRef} from 'react';
import {RawPreviewer} from "@/components/PreviewPanel/src/components";
import styles from './PreviewPanel.module.css';
import {ComponentSize} from "@/constants/enums";


export type PreviewPanelProps = {}

export const PreviewPanel: React.FunctionComponent<PreviewPanelProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = React.useState(800);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const containerHeight = entries[0].contentRect.height;
            setPanelHeight(containerHeight);
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [containerRef]);

    return (
        <div className={styles.previewPanel} ref={containerRef}>
            <RawPreviewer height={panelHeight}/>
        </div>
    );
};

