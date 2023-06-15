import React, {useEffect, useRef, useState} from 'react';
import {Toolbar} from "@/components/Toolbar";

import styles from "./InputPanel.module.css";
import {DataFieldsList} from "@/components/InputPanel/src/components";
import {ComponentSize} from "@/constants/enums";
import { TreeSelect } from '@douyinfe/semi-ui';
import { convertToTreeData } from '@/components/FilesPanel/src';


export type InputPanelProps = {
    isMobile: boolean
}

export const InputPanel: React.FunctionComponent<InputPanelProps> = ({isMobile, ...props}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setPanelHeight] = React.useState(800);
    const [componentSize, setComponentSize] = React.useState(ComponentSize.LARGE);
    const files = [
        {
            label: 'Asia',
            emoji: {
                background: "#123456",
                code: "U+1F600"
            },

            children: [
                {
                    label: 'China',
                    emoji: {
                        background: "#123456",
                        code: "U+1F1E8 U+1F1F3",
                    },
                    children: [
                        {
                            label: 'Beijing',
                        },
                        {
                            label: 'Guangzhou',
                        },
                    ],
                },
                {
                    label: 'Japan',
                    emoji: {
                        background: "#123456",
                        code: "U+1F1EF U+1F1F5",
                    },
                },
            ],
        },
    ];

    const initTreeData = convertToTreeData(files, '');

    console.log("init tree data: ", initTreeData);
    const [treeData, setTreeData] = useState(initTreeData);

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
                <TreeSelect className='w-100' treeData={treeData}/>
            }
            <Toolbar/>
            <DataFieldsList size={componentSize} height={containerHeight - 64}/>
        </div>
    );
};


