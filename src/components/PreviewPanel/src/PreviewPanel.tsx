import React, {useEffect, useRef} from 'react';
import {RawPreviewer, SettingBar, TablePreviewer} from "@/components/PreviewPanel/src/components";
import styles from './PreviewPanel.module.css';
import {ComponentSize, PreviewType} from "@/constants/enums";
import {RootState} from "@/types/system";
import {useSelector} from "react-redux";


export type PreviewPanelProps = {}

export const PreviewPanel: React.FunctionComponent<PreviewPanelProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [panelHeight, setPanelHeight] = React.useState(800);
    const [panelWidth, setPanelWidth] = React.useState(800);
    const [componentsSize, setComponentsSize] = React.useState(ComponentSize.LARGE);

    // store
    const previewType = useSelector((state: RootState) => state.preview.previewType);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const containerHeight = entries[0].contentRect.height;
            const containerWidth = entries[0].contentRect.width;

            if (containerWidth < 450) {
                setComponentsSize(ComponentSize.SMALL);
            } else {
                setComponentsSize(ComponentSize.LARGE);
            }
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
        <div className={`${styles.previewPanel} no-select-area`} ref={containerRef}>
            <SettingBar size={componentsSize}/>

            {previewType === PreviewType.RAW ?
                <RawPreviewer height={panelHeight - 62}/> :
                <TablePreviewer height={panelHeight - 100} width={panelWidth}/>
            }
        </div>
    );
};

