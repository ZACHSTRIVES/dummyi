import {Button, Nav} from "@douyinfe/semi-ui";
import {IconMenu, IconTerminal} from "@douyinfe/semi-icons";
import React, {FunctionComponent, useState} from "react";
import styles from './NavBar.module.css';
import {ColorModeSwitchButton} from "@/components/Layout/src/components/ColorModeSwitchButton";
import {ColorMode} from "@/constents/enums";
import {useSelector} from "react-redux";
import {Store} from "@/types/system";

export type NavBarProps = {}

export const NavBar: FunctionComponent<NavBarProps> = () => {

    const colorMode: ColorMode = useSelector((state: Store) => state.settings.colorMode);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
        const links = document.querySelector('.semi-navigation-list-wrapper');
        links?.classList.toggle('active');
    };

    return (
        <div>
            <Nav
                mode="horizontal"
                className={styles.navBar}
                defaultSelectedKeys={["Home"]}
                onSelect={(key) => console.log(key)}
            >
                <Nav.Header
                    logo={<IconTerminal
                        style={{fontSize: 36, color: colorMode === ColorMode.DARK ? 'white' : "black"}}/>}
                    text={"Mockdata.co.nz"}
                >
                    <Button
                        className={styles.hamburgerIcon}
                        onClick={handleMenuClick}
                        theme="borderless"
                        icon={<IconMenu size="large" style={{color: colorMode === ColorMode.DARK ? 'gray' : "black"}} />}
                    />
                </Nav.Header>

                <Nav.Item className={styles.navItems} itemKey="Home" text="Home"/>
                <Nav.Item className={styles.navItems} itemKey="Live" text="Generator"/>
                <Nav.Item className={styles.navItems} itemKey="Setting" text="About"/>

                <Nav.Footer>
                    <ColorModeSwitchButton/>
                </Nav.Footer>

            </Nav>
        </div>
    );
}
