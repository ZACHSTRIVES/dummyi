import {IconLanguage} from '@douyinfe/semi-icons';
import {Button, Dropdown} from '@douyinfe/semi-ui';
import {useRouter} from 'next/router';
import {FunctionComponent} from 'react';
import {Locales} from '@/constents/enums';

const localeMap = {
    [Locales.EN]:{
        name: 'English',
        icon: '🇬🇧',
        shortcuts:'EN'
    },
    [Locales.ZH]:{
        name: '中文',
        icon: '🇨🇳',
        shortcuts:'中文'
    }
}

export type LocaleSwitcherProps = {};

export const LocaleSwitchButton: FunctionComponent<LocaleSwitcherProps> = () => {
    const {locale, push, asPath} = useRouter();

    return (
        <Dropdown
            render={
                <Dropdown.Menu>
                    {Object.entries(localeMap).map(([key, value]) => (
                        <Dropdown.Item key={key} onClick={() => push(asPath, '', {locale: key})}>
                            {value.icon} {value.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            }
        >
            <Button
                theme="borderless"
                icon={<IconLanguage size="large"/>}
                style={{
                    color: 'var(--semi-color-text-2)',
                }}
            >
                {localeMap[locale].shortcuts}
            </Button>
        </Dropdown>

    );
};