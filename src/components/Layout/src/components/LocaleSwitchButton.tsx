import React, {FunctionComponent} from 'react';
import {IconLanguage} from '@douyinfe/semi-icons';
import {Button, Modal, Radio, RadioGroup, Tooltip} from '@douyinfe/semi-ui';
import {useRouter} from 'next/router';
import {Locales} from '@/constants/enums';
import {useIntl} from "@/locale";

const localeMap = {
    [Locales.EN]: {
        name: 'English',
        shortcuts: 'EN'
    },
    [Locales.ZH_CN]: {
        name: '中文',
        shortcuts: '中文'
    }
}

export type LocaleSwitchButtonProps = {
    size: 'large' | 'extra-large'
};

export const LocaleSwitchButton: FunctionComponent<LocaleSwitchButtonProps> = ({...props}) => {
    const intl = useIntl();
    const {locale, push, asPath} = useRouter();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isSettingLocale, setIsSettingLocale] = React.useState(false);

    // actions
    const handleLocaleChange = async (e) => {
        if (isSettingLocale) return;
        setIsSettingLocale(true);
        push(asPath, asPath, {locale: e.target.value}).then(() => {
            setIsSettingLocale(false);
            setIsModalVisible(false);
        });
    }

    return (
        <>
            <Tooltip content={intl.formatMessage({id: 'nav.languageSwitchModal.title'})}>
                <Button
                    theme="borderless"
                    icon={<IconLanguage size={props.size}/>}
                    style={{
                        color: 'var(--semi-color-text-2)',
                    }}
                    onClick={() => setIsModalVisible(true)}
                >
                    {localeMap[locale].shortcuts}
                </Button>
            </Tooltip>

            <Modal visible={isModalVisible}
                   icon={<IconLanguage size={'extra-large'}/>}
                   footer={null}
                   style={{width: '90vw', maxWidth: '300px'}}
                   onCancel={() => setIsModalVisible(false)}
                   title={intl.formatMessage({id: 'nav.languageSwitchModal.title'})}>

                <div style={{marginBottom: '20px'}}>
                    <RadioGroup type='pureCard' value={locale} direction='vertical' name="lang-radio-group">
                        {Object.entries(localeMap).map(([key, value]) => (
                            <Radio key={key} value={key}
                                   style={{width: 200, height: 50, borderRadius: '12px'}} onChange={handleLocaleChange}>
                                 {value.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </div>

            </Modal>
        </>
    );
};