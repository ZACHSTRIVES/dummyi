import React, { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { AboutLayout } from "@/components/Layout/about";
import DatePage from "./date";
import NumberPage from "./number";
import StringPage from "./string";


const About: React.FC = () => {
    return (
        <AboutLayout>            
        </AboutLayout>
    );
}

export default About;