import semiZhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import semiEnUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import type { Props as ReactIntlFormattedMessageProps } from 'react-intl/src/components/message';
import { useIntl as useReactIntl, FormattedMessage as ReactIntlFormattedMessage } from 'react-intl';
import React, { ReactNode } from 'react';
import {FormatMessageArgs, IntlMessageKeys} from "@/types/system";

// translation
import zhTranslations from './translations/zh.json';
import enTranslations from './translations/en.json';
import {Locales} from "@/constants/enums";

export const translations = {
    [Locales.EN]:{
        semi:semiEnUS,
        app:enTranslations
    },
    [Locales.ZH]:{
        semi:semiZhCN,
        app:zhTranslations
    }
};

export const useIntl = () => {
    // Pull out the original formatMessage function
    const { formatMessage, ...args } = useReactIntl();

    // Re-write the formatMessage function but with an enhanced id type
    const typedFormatMessage = (
        descriptor: FormatMessageArgs[0] & {
            id: IntlMessageKeys;
        },
        values?: FormatMessageArgs[1],
        options?: FormatMessageArgs[2],
    ) => {
        // @ts-ignore
        return formatMessage(descriptor, values, options);
    };

    return {
        ...args,
        formatMessage: typedFormatMessage,
    };
};

// Extend the original FormattedMessage props
export type FormattedMessageProps = ReactIntlFormattedMessageProps<Record<string, ReactNode>> & {
    id: IntlMessageKeys;
};

export function FormattedMessage({ id, ...props }: FormattedMessageProps) {
    // @ts-ignore
    return <ReactIntlFormattedMessage id={id} {...props} />;
}