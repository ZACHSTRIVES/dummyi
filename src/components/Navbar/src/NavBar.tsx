import {Nav} from "@douyinfe/semi-ui";
import React, {FunctionComponent, useState} from "react";
import styles from './NavBar.module.css';
import {ColorModeSwitchButton} from "@/components/Navbar/src/components/ColorModeSwitchButton";
import {ColorMode} from "@/constants/enums";
import {useSelector} from "react-redux";
import {RootState} from "@/types/system";
import {LocaleSwitchButton} from "@/components/Navbar/src/components/LocaleSwitchButton";
import {useIntl} from "@/locale";
import {useRouter} from "next/router";
import {GithubButton} from "@/components/Navbar/src/components/GithubButton";
import Hamburger from 'hamburger-react'
import {Logo} from "@/components/Navbar/src/components/Logo";
import {LoginButton} from "./components/LoginButton";
import {User, UserLogin} from "./components/UserLogin";
import {SchemaSelector} from "@/components/SchemaSelector";

export type NavBarProps = {}

export const NavBar: FunctionComponent<NavBarProps> = () => {

    const colorMode: ColorMode = useSelector((state: RootState) => state.app.colorMode);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [defaultSelectedKeys, setSelectedKeys] = useState([]);
    const intl = useIntl();
    const {pathname, push} = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    const user: User = {
        id: "ID123",
        name: "John"
    }

    return (
        <div>
            <Nav
                mode="horizontal"
                className={styles.navBar}
                defaultSelectedKeys={defaultSelectedKeys}
                onSelect={(key) => onSelectItem(key)}>

                <Nav.Header className={styles.navHeader}>
                    <Logo/>
                    <div className={styles.hamburgerIcon}>
                        <Hamburger toggled={isMenuOpen}
                                   toggle={handleMenuClick}
                                   color={colorMode === ColorMode.DARK ? 'white' : "black"}
                                   size={22} duration={0.6}/>
                    </div>

                    <SchemaSelector/>

                </Nav.Header>


                {/*{*/}
                {/*    navBarRoutes.map((route, index) => {*/}
                {/*        return (*/}
                {/*            <Nav.Item*/}
                {/*                key={route.path}*/}
                {/*                className={styles.navItems}*/}
                {/*                itemKey={route.path}*/}
                {/*                text={intl.formatMessage({id: route.localeId})}*/}
                {/*            />*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}


                <Nav.Footer className="gap-2">
                    <GithubButton size={isMenuOpen ? "large" : 'extra-large'}/>
                    <ColorModeSwitchButton size={isMenuOpen ? "large" : 'extra-large'}/>
                    <LocaleSwitchButton size={isMenuOpen ? "large" : 'extra-large'}/>
                    {
                        isLoggedIn
                            ? <UserLogin user={user} className={styles.loginButton} onLogout={handleLogout}/>
                            : <LoginButton className={styles.loginButton} onLogin={handleLogin}/>
                    }
                </Nav.Footer>
            </Nav>
        </div>
    );
}
