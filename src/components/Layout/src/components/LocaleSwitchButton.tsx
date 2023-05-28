import React, {FunctionComponent} from 'react';
import {IconLanguage} from '@douyinfe/semi-icons';
import {Button, Modal, Radio, RadioGroup, Row, Tooltip, Typography} from '@douyinfe/semi-ui';
import Image from "next/image";
import {useRouter} from 'next/router';
import {Locales} from '@/constants/enums';
import {useIntl} from "@/locale";

const localeMap = {
    [Locales.EN]: {
        name: 'English',
        shortcuts: 'EN',
        flag: '🇬🇧',
        generatedByChatGPT: false
    },
    [Locales.ZH_CN]: {
        name: '中文',
        shortcuts: '中文',
        flag: '🇨🇳',
        generatedByChatGPT: false
    },
    [Locales.JA_JP]: {
        name: '日本語',
        shortcuts: '日本語',
        flag: '🇯🇵',
        generatedByChatGPT: true
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
    const {Text} = Typography;

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
                   footer={null}
                   style={{width: '90vw', maxWidth: '350px'}}
                   onCancel={() => setIsModalVisible(false)}
                   title={<>
                       <IconLanguage size={'extra-large'}/>
                       <div style={{marginLeft: "6px"}}>
                           {intl.formatMessage({id: 'nav.languageSwitchModal.title'})}
                       </div>
                   </>}
            >

                <div style={{marginBottom: '20px'}}>
                    <RadioGroup type='pureCard' value={locale} direction='vertical' name="lang-radio-group">
                        {Object.entries(localeMap).map(([key, value]) => (
                            <Radio key={key} value={key}
                                   style={{
                                       width: '300px',
                                       height: 50,
                                       borderRadius: '12px'
                                   }}
                                   onChange={handleLocaleChange}
                            >

                                {value.flag} {value.name}

                            </Radio>
                        ))}
                    </RadioGroup>

                    <div className={'flex'}
                         style={{marginTop: "24px", alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                        <Image src={"/images/ChatGpt.svg" } height={16} width={16} alt={'ChatGPT'}/>
                        <div style={{fontSize: 8, color: 'gray', marginLeft: '6px'}}>
                            {intl.formatMessage({id: 'nav.languageSwitchModal.footer.chatGPT.text'})}
                        </div>
                    </div>

                </div>

            </Modal>
        </>
    );
};