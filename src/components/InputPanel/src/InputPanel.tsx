import React, {useEffect, useRef} from 'react';
import {Toolbar} from "@/components/Toolbar";
import styles from "./InputPanel.module.css";
import {DataFieldsList} from "@/components/InputPanel/src/components";
import {ComponentSize} from "@/constants/enums";
import {TreeSelect} from '@douyinfe/semi-ui';
import {useSelector} from "react-redux";
import {selectCollections} from "@/reducers/collection/collectionSelectors";

export type InputPanelProps = {
    isMobile: boolean
}

export const InputPanel: React.FunctionComponent<InputPanelProps> = ({isMobile, ...props}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setPanelHeight] = React.useState(800);
    const [componentSize, setComponentSize] = React.useState(ComponentSize.LARGE);

    // state
    const collections = useSelector(selectCollections);

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const containerHeight = entries[0].contentRect.height;
            const containerWidth = entries[0].contentRect.width;

            setPanelHeight(containerHeight);

            if (containerWidth > 1000) {
                setComponentSize(ComponentSize.LARGE);
            } else if (containerWidth > 550) {
                setComponentSize(ComponentSize.MEDIUM);
            } else {
                setComponentSize(ComponentSize.SMALL);
            }
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
            <div className={styles.background}/>
            {isMobile &&
                <TreeSelect expandAll={true} className={`${styles.treeSelect} w-100`} treeData={collections}/>
            }
            <Toolbar/>
            <DataFieldsList size={componentSize} height={containerHeight - 64}/>
        </div>
    );
};


