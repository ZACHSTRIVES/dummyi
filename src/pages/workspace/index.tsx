import InputPane from "@/components/Layout/src/components/InputPane";
import PreviewPane from "@/components/Layout/src/components/PreviewPane";
import React, { useEffect, useState } from "react";

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';

import styles from './index.module.css';

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
        <InputPane/>
      </ReflexElement>

      <ReflexSplitter className={`${styles.splitter} ${orientation}`} />

      <ReflexElement>
        <PreviewPane/>
      </ReflexElement>
    </ReflexContainer>
  );
}