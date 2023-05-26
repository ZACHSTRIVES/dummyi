import React, { useEffect } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import styles from './workspace.module.css';
import { InputPanel } from "@/components/InputPanel";
import { PreviewPanel } from "@/components/PreviewPanel";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/types/system";
import { ColorMode, PanelsOrientation } from "@/constants/enums";
import { doSetPanelsOrientation } from "@/reducers/workspace/workspaceActions";
import Head from "next/head";
import { useIntl } from "@/locale";
import { FilesPanel } from "@/components/FilesPanel/src";

export default function Workspace() {
    const intl = useIntl();
    const dispatch = useDispatch();

    // store
    const panelsDirection = useSelector((state: Store) => state.workspace.panelsOrientation);
    const colorMode = useSelector((state: Store) => state.app.colorMode);

    const files = [
        {
            label: 'Asia',
            children: [
                {
                    label: 'China',
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
                },
            ],
        },
    ];

    useEffect(() => {
        setOrientation(getOrientation());
        function handleResize() {
            const newOrientation = getOrientation();
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

    function getOrientation(): PanelsOrientation {
        return window.innerWidth < 750 ?
            PanelsOrientation.HORIZONTAL : PanelsOrientation.VERTICAL;
    }

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "nav.item.workspace" })} - Duymmi</title>
            </Head>

            <ReflexContainer orientation={PanelsOrientation.VERTICAL}>
                <ReflexElement size={200} minSize={200} maxSize={300}>
                    <FilesPanel files={files} />
                </ReflexElement>

                <ReflexSplitter
                    style={{
                        backgroundColor: colorMode === ColorMode.DARK ? 'rgba(153,153,153,0.44)' : '#d5d3d3',
                        borderColor: 'transparent',
                        borderWidth: '1px'
                    }}
                    className={`${styles.splitter} ${PanelsOrientation.VERTICAL}`}
                />

                <ReflexElement>
                    <ReflexContainer orientation={panelsDirection}>
                        <ReflexElement minSize={panelsDirection === PanelsOrientation.HORIZONTAL ? 200 : 400}
                                       className={styles.leftReflexElement}>
                            <InputPanel />
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