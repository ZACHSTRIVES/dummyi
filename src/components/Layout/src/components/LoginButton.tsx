import { Button } from "@douyinfe/semi-ui";

export type LoginProps = {
    className?: string,
    onLogin?: () => void
};

export const LoginButton : React.FunctionComponent<LoginProps> = ({onLogin, ...props}) => {
    return (
        <Button className={`text-2 ${props.className}`} onClick={onLogin}>Login</Button>
    )
}