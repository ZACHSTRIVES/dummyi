import React from "react";
import {Button, Empty} from "@douyinfe/semi-ui";
import {
    IllustrationNotFound,
    IllustrationNotFoundDark,
} from "@douyinfe/semi-illustrations";
import {useIntl} from "@/locale";


const NotFoundPage: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <Empty
            style={{marginTop: '100px', textAlign: 'center'}}
            image={<IllustrationNotFound style={{width: 150, height: 150}}/>}
            darkModeImage={<IllustrationNotFoundDark style={{width: 150, height: 150}}/>}
            title={'404'}
            description={intl.formatMessage({id:"error.404.description"})}
        >
            <Button>{intl.formatMessage({id:"error.404.button.text"})}</Button>
        </Empty>
    )
}
export default NotFoundPage;