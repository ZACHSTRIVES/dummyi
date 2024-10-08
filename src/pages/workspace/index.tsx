import React, {useEffect, useState} from "react";
import {ReflexContainer, ReflexElement, ReflexSplitter} from 'react-reflex';
import styles from './workspace.module.css';
import {InputPanel} from "@/components/InputPanel";
import {PreviewPanel} from "@/components/PreviewPanel";
import {useDispatch, useSelector} from "react-redux";
import {ColorMode, PanelsOrientation} from "@/constants/enums";
import {doGeneratePreviewData, doSetPanelsOrientation} from "@/reducers/workspace/workspaceActions";
import Head from "next/head";
import {useIntl} from "@/locale";
import {selectPanelsOrientation, selectPreviewData} from "@/reducers/workspace/workspaceSelectors";
import {selectColorMode} from "@/reducers/app/appSelectors";
import {ExportModal} from "@/components/Exporter";

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
                <title>Dummyi - Mock Data Generator</title>
            </Head>


            <ReflexContainer orientation={panelsDirection}>
                <ReflexElement minSize={panelsDirection === PanelsOrientation.HORIZONTAL ? 200 : 400}
                               className={styles.leftReflexElement}>
                    <InputPanel/>
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
                    <PreviewPanel/>
                </ReflexElement>
            </ReflexContainer>


            <ExportModal/>
        </>
    );
}