import React from "react";
import Head from "next/head";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <Head>
                <title>About - Duymmi</title>
            </Head>
            <Image width={50} height={50} src={'/images/exportFormats/dark/Javascript.svg'} alt={'test'}/>
        </div>
    );
}