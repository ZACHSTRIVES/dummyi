import {IconMoon, IconSun} from '@douyinfe/semi-icons';
import {Button} from '@douyinfe/semi-ui';
import {FunctionComponent, useEffect} from 'react';
import {ColorMode} from "@/constents/enums";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "@/types/system";
import {doSetColorMode} from "@/actions/settingActions";

export const ColorModeSwitchButton: FunctionComponent = () => {

    const dispatch = useDispatch();

    // stores
    const colorMode:ColorMode = useSelector((state: Store) => state.settings.colorMode);

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
        <Button
            theme="borderless"
            icon={colorMode===ColorMode.DARK ? <IconSun size="large" /> : <IconMoon size="large" />}
            style={{
                color: 'var(--semi-color-text-2)',
            }}
            onClick={handleSwitchColorMode}
        />
    )
}