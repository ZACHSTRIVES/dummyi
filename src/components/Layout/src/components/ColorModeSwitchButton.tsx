import {IconMoon, IconSun} from '@douyinfe/semi-icons';
import {Button, Tooltip} from '@douyinfe/semi-ui';
import {FunctionComponent, useEffect} from 'react';
import {ColorMode} from "@/constants/enums";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetColorMode} from "@/reducers/app/appActions";
import {useIntl} from "@/locale";

export type ColorModeSwitchButtonProps = {
    size: 'large' | 'extra-large'
}

export const ColorModeSwitchButton: FunctionComponent<ColorModeSwitchButtonProps> = ({...props}) => {

    const dispatch = useDispatch();
    const intl = useIntl();

    // stores
    const colorMode: ColorMode = useSelector((state: Store) => state.app.colorMode);

    const updateThemeToBody = (mode: ColorMode) => {
        const {body} = document;
        body.setAttribute('theme-mode', mode);
        if (mode === ColorMode.DARK) {
            body.classList.add();
        } else {
            body.classList.remove(ColorMode.DARK);
        }
    }

    useEffect(() => {
        updateThemeToBody(colorMode);
    }, [colorMode]);

    const handleSwitchColorMode = () => {
        const mode = colorMode === ColorMode.DARK ? ColorMode.LIGHT : ColorMode.DARK;
        dispatch(doSetColorMode(mode));
    }

    return (
        <Tooltip content={colorMode === ColorMode.DARK ?
            intl.formatMessage({id: "nav.colorModeSwitchButton.switchToLightMode.text"}) :
            intl.formatMessage({id: "nav.colorModeSwitchButton.switchToDarkMode.text"})}
        >
            <Button
                theme="borderless"
                icon={colorMode === ColorMode.DARK ?
                    <IconSun size={props.size}/> :
                    <IconMoon size={props.size}/>}
                className="text-2"
                onClick={handleSwitchColorMode}
            />
        </Tooltip>
    )
}