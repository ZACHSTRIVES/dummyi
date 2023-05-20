import React, {FunctionComponent} from "react";
import {Layout, Tag, Typography} from "@douyinfe/semi-ui";
import Image from 'next/image';
import packageJson from '../../../../../package.json';
import {useSelector} from "react-redux";
import {ColorMode} from "@/constants/enums";
import {Store} from "@/types/system";
import Link from "next/link";
import {GITHUB_URL} from "@/constants/links";


export type FooterProps = {
    className?: string;
}

export const Footer: FunctionComponent<FooterProps> = ({className}) => {
    const {Footer} = Layout;
    const {Text} = Typography;

    // store
    const colorMode = useSelector((state: Store) => state.app.colorMode);

    const projectVersion = packageJson.version;

    return (
        <Footer
            className={className}
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '16px',
                color: 'var(--semi-color-text-2)',
                backgroundColor: 'rgba(var(--semi-grey-0), 1)',
            }}
        >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Image width={100} height={30} alt={"Dummy"} src={"/images/logo-grey.svg"}/>
                    <Tag color={'grey'} type={colorMode === ColorMode.DARK ? 'solid' : 'ghost'}
                         size={"small"}>Beta v{projectVersion}</Tag>
                </span>

            <span>
                <Link href={GITHUB_URL}>
                    <Text size={"small"} style={{marginRight: '24px'}}>
                        Github
                    </Text>
                </Link>
                <Link href={'/about'}>
                    <Text size={"small"}>
                        About
                    </Text>
                </Link>
            </span>
        </Footer>
    )
}