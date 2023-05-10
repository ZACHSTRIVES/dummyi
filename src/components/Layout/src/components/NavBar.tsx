import {Button, Nav} from "@douyinfe/semi-ui";
import {IconMenu, IconTerminal, IconClose} from "@douyinfe/semi-icons";
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


export type NavBarProps = {}

export const NavBar: FunctionComponent<NavBarProps> = () => {

    const colorMode: ColorMode = useSelector((state: Store) => state.settings.colorMode);
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
                onSelect={(key) => onSelectItem(key)}
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
                        icon={
                            isMenuOpen ?
                                <IconClose size="large"
                                           style={{color: colorMode === ColorMode.DARK ? 'gray' : "black"}}/> :
                                <IconMenu size="large"
                                           style={{color: colorMode === ColorMode.DARK ? 'gray' : "black"}}/>
                        }
                    />
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
                    <ColorModeSwitchButton/>
                    <LocaleSwitchButton/>
                </Nav.Footer>

            </Nav>
        </div>
    );
}
