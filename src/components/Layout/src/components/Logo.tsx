import {FunctionComponent} from 'react';
import Link from 'next/link';
import {Store} from "@/types/system";
import {useSelector} from "react-redux";
import {ColorMode} from "@/constants/enums";
import Image from "next/image";

export type LogoProps = {};

export const Logo: FunctionComponent<LogoProps> = ({...props}) => {

    // store
    const colorMode = useSelector((state: Store) => state.app.colorMode);

    return (
        <Link href={"/"} legacyBehavior>
            <Image alt="Logo" width={135} height={40}
                   src={colorMode === ColorMode.DARK ? "/images/logo-white.svg" : "/images/logo-black.svg"}/>
        </Link>
    );
};