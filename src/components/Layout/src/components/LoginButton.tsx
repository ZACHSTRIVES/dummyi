import { Button } from "@douyinfe/semi-ui";

export type LoginProps = {
    className?: string
};

export const LoginButton : React.FunctionComponent<LoginProps> = ({...props}) => {
    return (
        <Button className={`nav-btn ${props.className}`}>Login</Button>
    )
}