import React, { useEffect, useState } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import styles from './workspace.module.css';
import { InputPanel } from "@/components/InputPanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { useDispatch, useSelector } from "react-redux";
import { ColorMode, PanelsOrientation } from "@/constants/enums";
import { doGeneratePreviewData, doSetPanelsOrientation } from "@/reducers/workspace/workspaceActions";
import Head from "next/head";
import { useIntl } from "@/locale";
import { FilesPanel } from "@/components/FilesPanel/src";
import { selectPanelsOrientation, selectPreviewData } from "@/reducers/workspace/workspaceSelectors";
import { selectColorMode } from "@/reducers/app/appSelectors";

const MOBILE_VIEW_MAX_WIDTH = 768;

export default function Workspace() {
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const panelsDirection = useSelector(selectPanelsOrientation);
    const colorMode = useSelector(selectColorMode);
    const previewData = useSelector(selectPreviewData);

    const [isMobileView, setIsMobileView] = useState(window.innerWidth < MOBILE_VIEW_MAX_WIDTH);

    React.useEffect(() => {
        if (previewData.length == 0) {
            dispatch(doGeneratePreviewData())
        }
    })

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

    useEffect(() => {
        function handleResize() {
            const currentIsMobileView = window.innerWidth < MOBILE_VIEW_MAX_WIDTH;
            setIsMobileView(currentIsMobileView);

            const newOrientation = currentIsMobileView ? PanelsOrientation.HORIZONTAL : PanelsOrientation.VERTICAL;
            setOrientation(newOrientation);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function setOrientation(orientation: PanelsOrientation) {
        dispatch(doSetPanelsOrientation(orientation));
    }

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "nav.item.workspace" })} - Duymmi</title>
            </Head>

            <ReflexContainer orientation={PanelsOrientation.VERTICAL}>
                {!isMobileView && (
                    <ReflexElement size={200} minSize={200} maxSize={300}>
                        <FilesPanel files={files} />
                    </ReflexElement>
                )}

                {!isMobileView && (
                    <ReflexSplitter
                        style={{
                            backgroundColor: colorMode === ColorMode.DARK ? 'rgba(153,153,153,0.44)' : '#d5d3d3',
                            borderColor: 'transparent',
                            borderWidth: '1px'
                        }}
                        className={`${styles.splitter} ${PanelsOrientation.VERTICAL}`}
                    />
                )}

                <ReflexElement>
                    <ReflexContainer orientation={panelsDirection}>
                        <ReflexElement minSize={panelsDirection === PanelsOrientation.HORIZONTAL ? 200 : 400}
                            className={styles.leftReflexElement}>
                            <InputPanel isMobile={isMobileView} />
                        </ReflexElement>

                        <ReflexSplitter
                            style={{
                                backgroundColor: colorMode === ColorMode.DARK ? 'rgba(153,153,153,0.44)' : '#d5d3d3',
                                borderColor: 'transparent',
                                borderWidth: '1px'
                            }}
                            className={`${styles.splitter} ${panelsDirection}`}
                        />

                        <ReflexElement minSize={panelsDirection === PanelsOrientation.HORIZONTAL ? 100 : 400}>
                            <PreviewPanel />
                        </ReflexElement>
                    </ReflexContainer>
                </ReflexElement>
            </ReflexContainer>
        </>
    );
}