import React from 'react';
import Image from "next/image";
import styles from './LoadingScreen.module.scss';
import {Spin} from "@douyinfe/semi-ui";

export const LoadingScreen = () => {
    return(
        <div className={styles.loadingPage}>
            <div>
                <Image alt="Logo" width={135} height={40} priority={true}
                       style={{cursor: "pointer"}}
                       src={"/images/logo-black.svg"}/>
                <Spin size="large" />
            </div>
        </div>
    )
}