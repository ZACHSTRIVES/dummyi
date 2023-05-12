import {Nav} from "@douyinfe/semi-ui";
import {IconTerminal} from "@douyinfe/semi-icons";
import React, {FunctionComponent, useState} from "react";
import styles from './NavBar.module.css';
import {ColorModeSwitchButton} from "@/components/Layout/src/components/ColorModeSwitchButton";
import {ColorMode} from "@/constents/enums";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";
import {LocaleSwitchButton} from "@/components/Layout/src/components/LocaleSwitchButton";
import {navBarRoutes} from "@/routes";
import {useIntl} from "@/locale";
import {useRouter} from "next/router";
import {GithubButton} from "@/components/Layout/src/components/GithubButton";
import Hamburger from 'hamburger-react'

export type NavBarProps = {}

export const NavBar: FunctionComponent<NavBarProps> = () => {

    const colorMode: ColorMode = useSelector((state: Store) => state.app.colorMode);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [defaultSelectedKeys, setSelectedKeys] = useState([]);
    const intl = useIntl();
    const {pathname, push} = useRouter();

    React.useEffect(() => {
        setSelectedKeys([pathname]);
    }, [pathname]);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
        const links = document.querySelector('.semi-navigation-list-wrapper');
        links?.classList.toggle('active');

        const footerIcons = document.querySelector('.semi-navigation-footer');
        footerIcons?.classList.toggle('active');
    };

    const onSelectItem = async (item) => {
        await push(item.itemKey);
        setSelectedKeys(item.selectedKeys);
        if (isMenuOpen) {
            handleMenuClick();
        }
    }

    return (
        <div>
            <Nav
                mode="horizontal"
                className={styles.navBar}
                defaultSelectedKeys={defaultSelectedKeys}
                onSelect={(key) => onSelectItem(key)}>

                <Nav.Header
                    logo={<IconTerminal
                        style={{fontSize: 36, color: colorMode === ColorMode.DARK ? 'white' : "black"}}/>}
                    text={"Mockdata.co.nz"}>

                    <div className={styles.hamburgerIcon}>
                        <Hamburger toggled={isMenuOpen}
                                   toggle={handleMenuClick}
                                   color={colorMode === ColorMode.DARK ? 'white' : "black"}
                                   size={22} duration={0.6}/>
                    </div>
                </Nav.Header>

                {
                    navBarRoutes.map((route, index) => {
                        return (
                            <Nav.Item
                                key={route.path}
                                className={styles.navItems}
                                itemKey={route.path}
                                text={intl.formatMessage({id: route.localeId})}
                            />
                        )
                    })
                }

                <Nav.Footer>
                    <GithubButton/>
                    <ColorModeSwitchButton/>
                    <LocaleSwitchButton/>
                </Nav.Footer>

            </Nav>
        </div>
    );
}
