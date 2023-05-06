import {Avatar, Button, Nav} from "@douyinfe/semi-ui";
import {IconBell, IconHelpCircle, IconTerminal, IconMenu} from "@douyinfe/semi-icons";
import React, {FunctionComponent, useState} from "react";

import styles from './NavBar.module.css';

export type NavBarProps = {}

export const NavBar: FunctionComponent<NavBarProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <Nav
                mode="horizontal"
                className="navbar"
                defaultSelectedKeys={["Home"]}
                onSelect={(key) => console.log(key)}
            >
                <Nav.Header
                    logo={<IconTerminal style={{fontSize: 36}}/>}
                    text={"mockdata.co.nz"}
                />

                <Nav.Item className={styles.navItems} itemKey="Home" text="Home"/>
                <Nav.Item className={styles.navItems} itemKey="Live" text="Generator"/>
                <Nav.Item className={styles.navItems} itemKey="Setting" text="About"/>

                <Nav.Footer>
                    <Button
                        className={styles.hamburgerIcon}
                        onClick={handleMenuClick}
                        theme="borderless"
                        icon={<IconMenu size="large" color={'black'}/>}
                    />
                </Nav.Footer>

            </Nav>
        </div>
    );
}
