import React from "react";
import {Button, Empty} from "@douyinfe/semi-ui";
import {IllustrationFailure, IllustrationFailureDark} from "@douyinfe/semi-illustrations";
import {useIntl} from "@/locale";

interface ErrorPageProps {
    statusCode: any
}


const ErrorPage: React.FunctionComponent<ErrorPageProps> = ({...props}) => {
    const {statusCode} = props;
    const intl = useIntl();

    return (
        <Empty
            style={{marginTop: '100px', textAlign: 'center'}}
            image={<IllustrationFailure style={{width: 150, height: 150}}/>}
            darkModeImage={<IllustrationFailureDark style={{width: 150, height: 150}}/>}
            title={statusCode}
            description={intl.formatMessage({id: "error.general.description"})}
        >
            <Button>{intl.formatMessage({id: "error.general.button.text"})}</Button>
        </Empty>
    )
}
export default ErrorPage;