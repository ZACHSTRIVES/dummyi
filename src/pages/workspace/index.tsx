import React, {useEffect} from "react";
import {ReflexContainer, ReflexElement, ReflexSplitter} from 'react-reflex';
import styles from './workspace.module.css';
import {InputPanel} from "@/components/InputPanel";
import {PreviewPanel} from "@/components/PreviewPanel";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {PanelsOrientation} from "@/constants/enums";
import {doSetPanelsOrientation} from "@/reducers/workspace/workspaceActions";

export default function Workspace() {
    const dispatch = useDispatch();

    // store
    const panelsDirection = useSelector((state: Store) => state.workspace.panelsOrientation);

    useEffect(() => {
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
        return window.innerWidth < 750?
            PanelsOrientation.HORIZONTAL : PanelsOrientation.VERTICAL;
    }

    return (
        <ReflexContainer orientation={panelsDirection}>
            <ReflexElement minSize={panelsDirection === PanelsOrientation.HORIZONTAL ? 200 : 375} className={styles.leftReflexElement}>
                <InputPanel/>
            </ReflexElement>

            <ReflexSplitter className={`${styles.splitter} ${panelsDirection}`}/>

            <ReflexElement minSize={panelsDirection === PanelsOrientation.HORIZONTAL ? 100 : 400}>
                <PreviewPanel/>
            </ReflexElement>
        </ReflexContainer>
    );
}