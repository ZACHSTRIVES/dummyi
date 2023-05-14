import React, {useEffect, useRef} from 'react';
import {RawPreviewer, SettingBar} from "@/components/PreviewPanel/src/components";
import styles from './PreviewPanel.module.css';
import {ComponentSize} from "@/constants/enums";


export type PreviewPanelProps = {}

export const PreviewPanel: React.FunctionComponent<PreviewPanelProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = React.useState(800);
    const [componentsSize, setComponentsSize] = React.useState(ComponentSize.LARGE);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const containerHeight = entries[0].contentRect.height;
            const containerWidth = entries[0].contentRect.width;
            if(containerWidth<430){
                setComponentsSize(ComponentSize.SMALL);
            }else{
                setComponentsSize(ComponentSize.LARGE);
            }
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
            <SettingBar size={componentsSize}/>
            <RawPreviewer height={panelHeight - 54}/>
        </div>
    );
};

