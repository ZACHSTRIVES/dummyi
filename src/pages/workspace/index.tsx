import React, {useEffect, useState} from "react";
import {ReflexContainer, ReflexSplitter, ReflexElement} from 'react-reflex';
import styles from './index.module.css';
import {InputPanel} from "@/components/InputPanel";
import {PreviewPanel} from "@/components/PreviewPanel";

export default function Workspace() {
    const [orientation, setOrientation] = useState(getOrientation());

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

    function getOrientation(): "horizontal" | "vertical" {

        return window.innerWidth < window.innerHeight ? "horizontal" : "vertical";
    }

    return (
        <ReflexContainer orientation={orientation}>
            <ReflexElement>
                <InputPanel/>
            </ReflexElement>

            <ReflexSplitter className={`${styles.splitter} ${orientation}`}/>

            <ReflexElement>
                <PreviewPanel/>
            </ReflexElement>
        </ReflexContainer>
    );
}